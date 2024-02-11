import { readFileSync, writeFileSync } from "fs"
const fca = require("mirai-fca-unofficial")

fca(JSON.parse(readFileSync("privates/credentials.json", "utf-8")), (error: any, api: any) => {
	if(error) return console.error(`Error [Appstate maker]: ${error}`)
	writeFileSync("privates/appstate.json", JSON.stringify(api.getAppState(), null, 4), "utf-8")
	console.log("We did it. Hooooraaaay!!!!")
})