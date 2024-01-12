import ytdl from "ytdl-core"
import { react } from "../utilities"

const YoutubeMusicApi = require('youtube-music-api')
const yt = new YoutubeMusicApi()

export async function main(api: any, event: any, regex: RegExp){
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
		const url = `https://www.youtube.com/watch?v=${music.content[0].videoId}`
		react(api, event, "⏳")
		const stream = ytdl(url, {
			quality: "lowestaudio"
		})
		const info = await ytdl.getInfo(url)
	}
}