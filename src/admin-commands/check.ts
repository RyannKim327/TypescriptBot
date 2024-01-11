export function check(api: any, event: any){
	api.sendMessage("Test from TypeScript", event.threadID, event.messageID)
}