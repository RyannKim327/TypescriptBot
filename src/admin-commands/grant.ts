import { readFileSync } from "fs";

export function main(api: any, event: any, regex: RegExp){
	const data = JSON.parse(readFileSync("configurations/permission.json", "utf-8"))
	const file = event.body.match(regex)[1]
	
	if(event.mentions.length > 0 && event.messageReply.senderID == undefined){
		
	}else if(event.messageReply.senderID){

	}
}