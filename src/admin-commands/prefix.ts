import { readFileSync, writeFileSync } from "fs"
import { react } from "../utilities"

export function main(api: any, event: any, regex: RegExp){
	let data = event.body.match(regex)[1]
	let preferences = JSON.parse(readFileSync("configurations/index.json", "utf-8"))
	if(data == preferences.prefix){
		api.sendMessage(`The prefix remain as ${data}`, event.threadID, (error: any, message: any) => {
			if(error) return react(api, event)
		})
	}else{
		preferences.prefix = data
		writeFileSync("configurations/index.json", JSON.stringify(preferences), "utf-8")
		api.sendMessage(`The prefix is now changed to ${data}`, event.threadID, (error: any, message: any) => {
			if(error) return react(api, event)
		})
	}
}