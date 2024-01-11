const fca = require("fca-unofficial")
import { artificial_inteligence } from './autobots-commands/artificial-intelligence'
import { command_lists } from './command-list'
import { existsSync, mkdirSync, readFileSync, rm } from 'fs'
import { regex } from './utilities'
import { commands } from './interfaces'

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
					console.log(lists[i].adminCommand)
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
			}else if(lists[i].queries){
				// let pref = lists[i].queries ?? []
				// for(let j = 0; j < pref.length; j++){}
				// 	let name = regex(preferences.name + pref[j])
				// 	if(name.test(event.body)){
						
				// 	}
				// }
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
		if(error) return console.error(`Error [API]: ${error.error}`)
		api.setOptions({
			listenEvents: true,
			selfListen: true,
			logLevel: "silent"
		})

		if(existsSync(`./../temp`)){
			rm(`./../temp`, (error: any) => {
				if(error) return console.error(`Pre may error`)
				setTimeout(() => {
					mkdirSync("./../temp")
				}, 500)
			})
		}
		
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