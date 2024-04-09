import { clearQuery } from '../index'
export function main(api: any, event: any, regex: RegExp){
	clearQuery(event.senderID)
	api.sendMessage("I already forgot what you've said to me.", event.threadID, (e: any) => {})
}