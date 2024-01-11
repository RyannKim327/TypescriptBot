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
			console.error(`Error [Message Reaction] ${error.error}`)
		}
	}, true)
}