# What's this

A simple broken smoke effect react component. A step in learning three.js with react. Ported from original creator Teo Litto's experiment on codepen https://codepen.io/teolitto/pen/KwOVvL

# Installation

```
npm i -S smoke-effect-react
```

# How to use

Import the package in your React project.

```
import SmokeElement from "smoke-effect-react";
```

Put the component in render and give these properties a value.
Important: These properties all require a value for it to work.
You can also specify a value width and height properties but must in px atm for it to work.

```
 <SmokeElement
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/95637/quickText.png"
          opacity="1"
          smokeSrc="https://s3-us-west-2.amazonaws.com/s.cdpn.io/95637/Smoke-Element.png"
          smokeOpacity="0.3"
        />
```

Smoke image used:
![smoke image](https://s3-us-west-2.amazonaws.com/s.cdpn.io/95637/Smoke-Element.png)

# Example

A different smoke image used with different opacity settings could give different results.
![smoke image](https://pngimg.com/uploads/smoke/smoke_PNG55217.png)

```
<SmokeElement src="./images/quickText.png"
          opacity="2"
          smokeSrc="./images/smoke_PNG55217.png"
          smokeOpacity="0.2"
          />
```

Result:
![smoke over image](https://i.ibb.co/5TkG4dJ/ezgif-4-19da91c951bf.gif)
