import { readFileSync, writeFileSync } from "fs"

export function getTime(timeZone?: string){
	let tz = "Asia/Manila"
	if(timeZone){
		tz = timeZone
	}
	const date = new Date()
	const dateTz = new Date(date.toLocaleString('en-US', {
		timeZone: tz
	}))
	return new Date(date.getTime() - (date.getTime() - dateTz.getTime()))
}

export function regex(convert: string){
	let str = convert.replace("/", "\\/").replace("?", "\\?").replace("$", "\\$").replace(".", "\\.").replace("^", "\\^")
	return new RegExp("^" + str, "i")
}

export function react(api: any, event: any, reaction?: string){
	api.setMessageReaction(reaction ?? "😢", event.messageID, (error: any) => {
		if(error){
			console.error(`Error [Message Reaction] ${error}`)
		}
	}, true)
}

export function fonts(text: string){
	const italic = "𝘈𝘉𝘊𝘋𝘌𝘍𝘎𝘏𝘐𝘑𝘒𝘓𝘔𝘕𝘖𝘗𝘘𝘙𝘚𝘛𝘜𝘝𝘞𝘟𝘠𝘡𝘢𝘣𝘤𝘥𝘦𝘧𝘨𝘩𝘪𝘫𝘬𝘭𝘮𝘯𝘰𝘱𝘲𝘳𝘴𝘵𝘶𝘷𝘸𝘹𝘺𝘻"
	const _default = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
	let returnData = ""
	for(let i = 0; i < text.length; i++){
		if(_default.includes(text[i])){
			for(let j = 0; j < _default.length; j++){
				if(text[i] == _default[j]){
					returnData += italic[j]
				}
			}
		}else{
			returnData += text[i]
		}
	}
	return returnData
}

export function saveData(filename: string, data: JSON){
	writeFileSync(filename, JSON.stringify(data, null, 4), "utf-8")
}

export function readData(filename: string){
	return JSON.parse(readFileSync(filename, "utf-8"))
}