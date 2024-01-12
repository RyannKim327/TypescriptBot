const fca = require("fca-unofficial")
import { artificial_inteligence } from './autobots-commands/artificial-intelligence'
import { command_lists } from './command-list'
import { mkdirSync, readFileSync, rm } from 'fs'
import { regex } from './utilities'
import { commands } from './interfaces'

const admins: any[] = ["61555199001800"]
const attemptAdmin: any[] = []

async function scan(api: any, event: any, preferences: any){
	let lists: commands[] = command_lists()
	let notMatched = true
	for(let i = 0; i < lists.length; i++){
		let messageType = lists[i].type ?? ["message"]
		if(messageType.includes(event.type)){
			if(lists[i].command){
				let pref = regex(preferences.prefix + lists[i].command)
				if(pref.test(event.body)){
					let folder = "user-commands"
					if(lists[i].adminCommand){
						folder = "admin-commands"
					}
					if(lists[i].adminCommand && !admins.includes(event.senderID)){
						if(attemptAdmin.includes(event.senderID)){
							return
						}
						attemptAdmin.push(event.senderID)
						return api.sendMessage("You don't have permission for admin commands", event.threadID)
					}
					const { main } = require(`./${folder}/${lists[i].script}`)
					if(lists[i].command?.includes("(") && lists[i].command?.includes(")")){
						main(api, event, pref)
					}else{
						main(api, event)
					}
					notMatched = false
				}
			}else if(lists[i].queries){
				let pref = lists[i].queries ?? [""]
				for(let j = 0; j < pref.length; j++){
					let name = regex(preferences.name + pref[j])
					if(name.test(event.body)){
						let folder = "user-commands"
						if(lists[i].adminCommand){
							folder = "admin-commands"
						}
						const { main } = require(`./${folder}/${lists[i].script}`)
						if(lists[i].command?.includes("(") && lists[i].command?.includes(")")){
							main(api, event, pref)
						}else{
							main(api, event)
						}
						notMatched = false
					}
				}
			}
		}
	}
	if(notMatched && (event.body.startsWith(preferences.name) || event.body.startsWith(preferences.prefix))){
		artificial_inteligence(api, event, preferences)
	}
}

async function start() {
	fca({
		appState: JSON.parse(readFileSync("privates/appstate.json", "utf-8"))
	}, async (error: any, api: any) => {
		if(error) return console.error(`Error [API]: ${error}`)
		const selfListen: boolean = true
		api.setOptions({
			listenEvents: true,
			selfListen: selfListen,
			logLevel: "silent"
		})
		if(selfListen){
			admins.push(api.getCurrentUserID())
		}

		rm(`${__dirname}/../temp`, { recursive: true }, (error: any) => {
			if(error) return console.error(`Pre may error ${JSON.stringify(error)}`)
			setTimeout(() => {
				mkdirSync(`${__dirname}/../temp`)
			}, 500)
		})
		
		api.listen(async (error: any, event: any) => {
			if(error) return console.error(`Error [Event] ${JSON.stringify(error)}`)
			let preferences = JSON.parse(readFileSync("configurations/index.json", "utf-8"))
			if(event.body != null){
				scan(api, event, preferences)
			}
		})
	})
}

start()