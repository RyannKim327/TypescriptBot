import { readFileSync, writeFileSync } from "fs";
import { react } from "../utilities";

export function main(api: any, event: any, regex: RegExp){
	let preferences = JSON.parse(readFileSync("configurations/index.json", "utf-8"))
	let data = event.body.match(regex)[1]
	if(!["v3","gemini","v3-32k","turbo","turbo-16k"].some(ind => data == ind)) data = "v3"
	preferences.aiVersion = data
	writeFileSync("configurations/index.json", JSON.stringify(preferences), "utf-8")
	api.sendMessage(`AI Version changed to ${data}`, event.threadID, (error: any, message: any) => {
		if(error) return react(api, event)
	})
}