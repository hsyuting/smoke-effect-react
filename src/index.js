import React, { Component } from "react";
import * as THREE from "three";

export default class Flip extends Component {
  componentDidMount() {
    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;

    //Three.js setup
    this.clock = new THREE.Clock();
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(width, height);

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, width / height, 1, 10000);
    this.camera.position.z = 1000;
    this.scene.add(this.camera);
    let geometry = new THREE.BoxGeometry(200, 200, 200);
    let material = new THREE.MeshLambertMaterial({
      color: 0xaa6666,
      wireframe: false
    });

    this.mesh = new THREE.Mesh(geometry, material);
    this.cubeSineDriver = 0;
    let textGeo = new THREE.PlaneGeometry(300, 300);

    let textTexture = new THREE.TextureLoader().load(
      this.props.src,
      textTexture => {
        let textMaterial = new THREE.MeshLambertMaterial({
          color: 0x00ffff,
          opacity: this.props.opacity,
          map: textTexture,
          transparent: true,
          blending: THREE.AdditiveBlending
        });
        let text = new THREE.Mesh(textGeo, textMaterial);
        text.position.z = 800;
        this.scene.add(text);
      },
      undefined,
      err => {
        console.log("load failed.");
        console.log(err);
      }
    );

    let light = new THREE.DirectionalLight(0xffffff, 0.5);
    light.position.set(-1, 0, 1);
    this.scene.add(light);
    this.smokeParticles = [];
    let smokeTexture = new THREE.TextureLoader().load(
      this.props.smokeSrc,
      smokeTexture => {
        let smokeMaterial = new THREE.MeshLambertMaterial({
          color: 0x00dddd,
          map: smokeTexture,
          opacity: this.props.smokeOpacity,
          transparent: true
        });
        let smokeGeo = new THREE.PlaneGeometry(300, 300);

        for (let p = 0; p < 150; p++) {
          let particle = new THREE.Mesh(smokeGeo, smokeMaterial);
          particle.position.set(
            Math.random() * 500 - 250,
            Math.random() * 500 - 250,
            Math.random() * 1000 - 100
          );
          particle.rotation.z = Math.random() * 360;
          this.scene.add(particle);
          this.smokeParticles.push(particle);
        }
      },
      undefined,
      err => {
        console.log("load failed.");
        console.log(err);
      }
    );

    this.mount.appendChild(this.renderer.domElement);
    // remember these initial values
    // let tanFOV = Math.tan(((Math.PI / 180) * this.camera.fov) / 2);
    // let windowHeight = height;

    this.animate(this);
  }
  componentWillUnmount() {
    cancelAnimationFrame(this.frameId);

    this.mount.removeChild(this.renderer.domElement);
  }
  animate = () => {
    this.delta = this.clock.getDelta();
    requestAnimationFrame(this.animate);
    this.evolveSmoke();
    this.mesh.rotation.x += 0.005;
    this.mesh.rotation.y += 0.01;
    this.cubeSineDriver += 0.01;
    this.mesh.position.z = 100 + Math.sin(this.cubeSineDriver) * 500;
    this.renderer.render(this.scene, this.camera);
  };

  evolveSmoke = () => {
    let sp = this.smokeParticles.length;
    while (sp--) {
      this.smokeParticles[sp].rotation.z += this.delta * 0.2;
    }
  };
  render() {
    return (
      <div
        style={{
          height: this.props.height || "100vh",
          width: this.props.width || "100vw",
          margin: "0"
        }}
        ref={mount => {
          this.mount = mount;
        }}
      />
    );
  }
}
