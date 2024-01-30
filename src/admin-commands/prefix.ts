import { readFileSync, writeFileSync } from "fs"
import { react, readData, saveData } from "../utilities"

export function main(api: any, event: any, regex: RegExp){
	let data = event.body.match(regex)[1]
	let preferences = readData("configurations/index.json")
	if(data == preferences.prefix){
		api.sendMessage(`The prefix remain as ${data}`, event.threadID, (error: any, message: any) => {
			if(error) return react(api, event)
		})
	}else{
		preferences.prefix = data
		saveData("configurations/index.json", preferences)
		api.sendMessage(`The prefix is now changed to ${data}`, event.threadID, (error: any, message: any) => {
			if(error) return react(api, event)
		})
	}
}