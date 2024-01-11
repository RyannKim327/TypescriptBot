const fca = require("fca-unofficial")
import { command_lists } from './command-list'
import { readFileSync } from 'fs'

async function scan(api: any, event: any, preferences: any){
	let commands = command_lists
	let notMatched = false
	for(let i = 0; i < commands.length; i++){
		
	}
}

async function start() {
	fca({
		appState: JSON.parse(readFileSync("privates/appstate.json", "utf-8"))
	}, async (error: any, api: any) => {
		if(error) return console.error(`Error [API]: ${error.error}`)
		api.setOptions({
			listenEvents: true,
			selfListen: true
		})

		api.listen(async (error: any, event: any) => {
			let preferences = JSON.parse(readFileSync("configuration/index.json", "utf-8"))
			if(error) return console.error(`Error [Event] ${error.error}`)
			if(event.body != null){
				scan(api, event, preferences)
			}
		})
	})
}

start()