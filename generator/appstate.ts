import { existsSync, mkdir, mkdirSync, readFileSync, writeFileSync } from "fs"
const fca = require("mirai-fca-unofficial")

fca({
	email: process.env['email'],
	password: process.env['password']
}, (error: any, api: any) => {
	if(error) return console.error(`Error [Appstate maker]: ${error}`)
	if(!existsSync(`${__dirname}/../privates/`)){
		mkdirSync(`${__dirname}/../privates/`)
	}
	writeFileSync("privates/appstate.json", JSON.stringify(api.getAppState(), null, 4), "utf-8")
	console.log("We did it. Hooooraaaay!!!!")
})