import axios from "axios";
import { react } from "../utilities";

export async function artificial_inteligence(api: any, event: any, preferences: any){
	let body = event.body
	if(body.startsWith(preferences.prefix)){
		body = body.substring(preferences.prefix.length)
	}else{
		body = body.substring(preferences.name.length)
	}
	react(api, event, "🤔")
	const version = preferences.aiVersion
	api.sendTypingIndicator(event.threadID, async (error: any) => {
		let { data } = await axios.get(`https://hercai.onrender.com/${version}/hercai?question=${body}`)
		if(error) return console.error(`Error [Artificial Inteligence typing]: ${error.error}`)
		api.sendMessage(data.reply, event.threadID, (error: any, message: any) => {
			if(error) return console.error(`Error [AI]: ${JSON.stringify(error)}`)
			react(api, event, "")
		}, event.messageID)		
	})
}