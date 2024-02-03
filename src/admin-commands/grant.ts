import { readData } from "../utilities";

export function main(api: any, event: any, regex: RegExp){
	const data = readData("configurations/permission.json")
	const file = event.body.match(regex)[1]
	
	if(event.mentions.length > 0 && event.messageReply.senderID == undefined){
		if(data[file] == undefined){
			data[file] = []
		}
		for(let ments in event.mentions){
			data[file].push(Object.keys(event.mentions[ments]))
		}
	}else if(event.messageReply.senderID){
		if(data[file] == undefined){
			data[file] = []
		}
	}
}