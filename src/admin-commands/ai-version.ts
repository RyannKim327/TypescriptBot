import { react, readData, saveData } from "../utilities";

export function main(api: any, event: any, regex: RegExp){
	let preferences = readData("configurations/index.json")
	let data = event.body.match(regex)[1]
	if(!["v3","gemini","v3-32k","turbo","turbo-16k"].some(ind => data == ind)) data = "v3"
	preferences.aiVersion = data
	saveData("configurations/index.json", preferences)
	api.sendMessage(`AI Version changed to ${data}`, event.threadID, (error: any, message: any) => {
		if(error) return react(api, event)
	})
}