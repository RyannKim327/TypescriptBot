import axios from "axios";

export async function artificial_inteligence(api: any, event: any, preferences: any){
	let body = event.body
	if(body.startsWith(preferences.prefix)){
		body = body.substring(preferences.prefix.length)
	}else{
		body = body.substring(preferences.name.length)
	}
	let { data } = await axios.get(`https://hercai.onrender.com/gemini/hercai?question=${body}`)
	api.sendMessage(data.reply, event.threadID, event.messageID)
}