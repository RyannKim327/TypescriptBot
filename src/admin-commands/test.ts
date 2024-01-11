export function test(api: any, event: any){
	api.sendMessage("Test from TypeScript", event.threadID, event.messageID)
}