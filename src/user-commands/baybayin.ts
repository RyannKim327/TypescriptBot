import axios from "axios";
import { react } from "../utilities";

export async function main(api: any, event: any, regex: RegExp) {
	const msg = event.body.match(regex)[1]
	const { data } = await axios.get(`https://api-baybayin-transliterator.vercel.app/?text=${msg}`)
	api.sendMessage(`Ito ang salin ng iyong talaga sa baybayin: ${data.baybayin}`, event.threadID, (error: any, message: any) => {
		if(error){
			console.error(error)
			react(api, event)
		}
	}, event.messageID)
}