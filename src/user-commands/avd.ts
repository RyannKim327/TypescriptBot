import axios from "axios";
import { createReadStream, createWriteStream, existsSync, unlink } from "fs";
import https from 'https';

export async function main(api: any, event: any, regex: RegExp){
	const { data } = await axios.post("https://avd.vercel.app/convert", {
		Headers: {
			"Content-Type": "application/json"
		},
		"url": encodeURI(event.body.match(regex)[1])
	})
	let data1 = data.medias[0].url // SD video from facebook then lowest resolution sa YT
	const file = createWriteStream("temp/avd.mp4")
	const dir = `${__dirname}/../temp/avd.mp4`
	https.get(data1, response => {
		response.pipe(file)
		file.on("finish", (result: any) => {
			api.sendMessage({
				body: "Test AV Downloader",
				attachment: createReadStream(dir).on("end", () => {
					if(existsSync(dir)){
						unlink(dir, (e) => {})
					}
				})
			})
		})
	})
}