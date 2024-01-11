import axios from "axios";

export async function artificial_inteligence(api: any, event: any){
	let { data } = await axios.get(`https://hercai.onrender.com/gemini/hercai?question=${event.body.substring(1)}`)
	api.sendMessage(data.reply, event.threadID, event.messageID)
}