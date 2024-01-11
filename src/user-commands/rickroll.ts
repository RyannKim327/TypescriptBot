import axios from "axios";
import { error } from "console";
import { createReadStream, createWriteStream, existsSync, unlink } from "fs";
import Innertube, { Utils } from "youtubei.js/agnostic";

export async function main(api: any, event: any){
	const youtube = await Innertube.create()
	const stream = await youtube.download("dQw4w9WgXcQ", {
		type: "audio",
		quality: "144p",
		format: "mp3"
	})
	const file = createWriteStream(`temp/rick_user_${event.messageReply.senderID}.mp3`)
	for await (let awit of Utils.streamToIterable(stream)){
		file.write(awit)
	}
	api.sendMessage({
		body: `A special message for you`,
		attachment: createReadStream(`../../rick_user_${event.messageReply.senderID}.mp3`).on("end", () => {
			if(existsSync(`../../rick_user_${event.message_reply.senderID}.mp3`)){
				unlink(`../../rick_user_${event.messageReply.senderID}.mp3`, (error: any) => {
					if(error) return console.error(`Error [Rickroll delete]: ${JSON.stringify(error)}`)
				})
			}
		})
	}, event.threadID)
}