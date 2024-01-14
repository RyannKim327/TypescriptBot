import axios from 'axios'
import { createReadStream, createWriteStream, existsSync, unlink } from 'fs'
import { get as http_get }from 'https'
import { react } from '../utilities'

export async function main(api: any, event: any, regex: RegExp){
	let prompt = event.body.match(regex)[1].trim()
	let { data } = await axios.get(`https://hercai.onrender.com/v3/text2image?prompt=${encodeURI(prompt)}`)
	const file = createWriteStream(`temp/${event.senderID}-ai-image.png`)
	const filename = `${__dirname}/../../temp/${event.senderID}-ai-image.png`
	http_get(data.url, (response) => {
		response.pipe(file)
		file.on("finish", () => {
			api.sendMessage({		
				body: "Here you go!!!",
				attachment: createReadStream(filename).on("end", () => {
					if(existsSync(filename)){
						unlink(filename, (error) => {})
					}
				})
			}, event.threadID, (error: any, message: any) => {
				if(error){
					console.error(error) 
					react(api, event)
				}
			}, event.messageID)
		})
	})
}