import ytdl from "ytdl-core"
import { react } from "../utilities"
import { createReadStream, createWriteStream, existsSync, unlink } from "fs"

const YoutubeMusicApi = require('youtube-music-api')
const yt = new YoutubeMusicApi()

export async function main(api: any, event: any, regex: RegExp){
	const file = `${__dirname}/../../temp/${event.senderID}_${event.threadID}.mp3`
	if(existsSync(file)){
		return api.sendMessage("Your request is still in process.", event.threadID, (error: any, message: any) => {
			if(error){
				react(api, event)
			}
		})
	}
	const data = event.body.match(regex)[1]
	react(api, event, "🔎")
	const ytFormat1 = /youtube.com\/watch\?v=([a-zA-Z0-9\-_]{11}$)/
	const ytFormat2 = /youtu.be\/([a-zA-Z0-9\-_]+)/
	let music: any = {
		"content": []
	}
	if(ytFormat1.test(data)){
		music = {
			"content": [
				{
					"videoId": data.match(ytFormat1)[1]
				}
			]
		}
	}else if(ytFormat2.test(data)){
		music = {
			"content": [
				{
					"videoId": data.match(ytFormat2)[1]
				}
			]
		}
	}else{
		await yt.initalize()
		music = await yt.search(data.replace(/[^\w\s]gi/, ''), "video")
	}
	if(music.content.length <= 0){
		return api.sendMessage("There's no video found.", event.threadID, (error: any, message: any) => {
			if(error){
				react(api, event)
			}
		}, event.messageID)
	}else if(music.content[0].videoId == undefined){
		return api.sendMessage("There's no video found.", event.threadID, (error: any, message: any) => {
			if(error){
				react(api, event)
			}
		}, event.messageID)
	}else{
		const file2 = createWriteStream(`temp/${event.senderID}_${event.threadID}.mp3`)
		const url = `https://www.youtube.com/watch?v=${music.content[0].videoId}`
		const info = await ytdl.getInfo(url)
		react(api, event, "⏳")
		ytdl(url, {
			quality: "lowest"
		}).pipe(file2).on("finish", async () => {
			let user = await api.getUserInfo(event.senderID)
			api.sendMessage({
				body: `Here's your request ${user[event.senderID]['firstName']} entitled: ${info.videoDetails.title}`,
				attachment: createReadStream(file).on("end", () => {
					if(existsSync(file)){
						unlink(file, (error) => {})
					}
					react(api, event, "")
				}),
				mentions: [{
					id: event.senderID,
					tag: user[event.senderID]['firstName']
				}]
			}, event.threadID)
		})
	}
}