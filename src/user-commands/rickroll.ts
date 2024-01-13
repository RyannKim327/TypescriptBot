import { createReadStream, createWriteStream, existsSync, unlink } from "fs"
import ytdl from 'ytdl-core'
import { react } from "../utilities"
import { getAllAdmins } from "../index"

export async function main(api: any, event: any){
	if(event.messageReply.senderID == api.getCurrentUserID()){
		return api.sendMessage("You may never fool me.", event.threadID, (error: any, message: any) => {
			if(error) return react(api, event)
		}, event.messageID)
	}
	if(getAllAdmins().includes(event.messageReply.senderID)){
		return api.sendMessage("You may never fool us.", event.threadID, (error: any, message: any) => {
			if(error) return react(api, event)
		}, event.messageID)
	}
	const file = createWriteStream(`temp/rick_user_${event.messageReply.senderID}.mp3`)
	ytdl("https://www.youtube.com/watch?v=dQw4w9WgXcQ", {
		quality: 'lowest'
	}).pipe(file).on("finish", async () => {
		let user = await api.getUserInfo(event.messageReply.senderID)
		api.sendMessage({
			body: `A song requested for you ${user[event.messageReply.senderID]['name']}`,
			attachment: createReadStream(`${__dirname}/../../temp/rick_user_${event.messageReply.senderID}.mp3`).on("end", () => {
				if(existsSync(`${__dirname}/../../temp/rick_user_${event.messageReply.senderID}.mp3`)){
					unlink(`${__dirname}/../../temp/rick_user_${event.messageReply.senderID}.mp3`, (error: any) => {
						if(error) return console.error(`Error [Rickroll delete]: ${JSON.stringify(error)}`)
					})
				}
			}),
			mentions: [{
				id: event.messageReply.senderID,
				tag: user[event.messageReply.senderID]['name']
			}]
		}, event.threadID, (error: any, message: any) => {
			if(error) return console.error(`Error [Rickroll]: ${error}`)
			api.sendMessage({
				attachment: createReadStream(`${__dirname}/../../res/rickroll.gif`)
			}, event.threadID, (error: any, message: any) => {
				if(error) return console.error(`Error [Rickroll GIF]: ${error}`)
			})
		})
	})
}