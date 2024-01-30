### Typescript Bot
#### MPOP Reverse II

---
### Introduction
> This repository is requested by Mark Kevin Manalo, this is just a simple template format for facebook bot, which is written with typescript

---
### Packages
``` Bash
npm install git+https://github.com/bhhoang/mirai-fca-unofficial.git
npm install axios
npm install nodemon
npm install @types/nodev --save-dev
npm install typescript

```

---
### Notes
> If you want to study more about typescript, kindly read this documentation: https://khalilstemmler.com/blogs/typescript/node-starter-project/

---
### Setups
> First thing you need is to know the other data, I've created a folder called privates, where all data are privately redirected there, specially the `appstate.json`. So first is you need to create a file named `appstate.json` inside of the privates folder, if the folder doesn't exists just create and name it `privates`. You may also create a file named `credentials.json`, then the content format is:
```JSON
{
	"email": "yourusername",
	"password": "sup3rm@n"
}
```

---
### Execution
> To execute the program, just run to your terminal `npx nodemon` or `npx ts-node src/index.ts`. The nodemon will automatically refresh if any .js or .ts file change, while the other one needs to terminal the program onced you changed something.