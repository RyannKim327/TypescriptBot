const fca = require("fca-unofficial")
import { test } from './admin-commands/test'
import { artificial_inteligence } from './autobots-commands/artificial-intelligence'
import { commands } from './interfaces' 
import { readFileSync } from 'fs'

const data = () => {
	let com: commands[] = []
	return com
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
			if(error) return console.error(`Error [Event] ${error.error}`)
			if(event.body != null){
				if(event.body == "/test_command"){
					test(api, event)
				}else if(event.body.startsWith("/")){
					artificial_inteligence(api, event)
				}
			}
		})
	})
}

start()