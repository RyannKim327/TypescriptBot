import { readFileSync } from "fs"
import { command_lists } from "../command-list"
import { react, readData } from "../utilities"

export async function main(api: any, event: any){
	const preferences = readData("configurations/index.json")
	const user = await api.getUserInfo(api.getCurrentUserID())
	let creds = [
		"Salvador",
		"John Jeremy Antiguo",
		"Earl Shine Sawir",
		"John Paul Caigas",
		"John Roy Lapida Calimlim",
		"Lester Navarra",
		"Jerson Carin",
		"Rovie Francisco",
		"Ken Jovenie Samonte",
		"Mark Kevin Manalo",
		"Mart Anthony Salazar",
		"Eljohn Mago",
		"Jovanny De Leon",
		"LuanRT",
		"Schemavery",
		"VanBanLaNhat",
		"Labs Bible",
		"Biblegateway",
		"Zenquotes",
		"AnimeQuotes",
		"OpenAI",
		"Tabs Ultimate Guitar",
		"DroidModifs",
		"And to all developers of the API used for this project."
	]
	let message = `Greetings, I am ${user[api.getCurrentUserID()]['name']}, your semi human semi bot. Here are my services and commands, that you may use:\n\n`
	for(let i in command_lists){
		let command: any = command_lists[i]
		let hint = command.hint ?? command.command
		let type = command.type ?? ["message"]
		message += `${parseInt(i) + 1}: ${command.name}\n    - ${command.description}\nCommand: ${preferences.prefix}${hint}\nType: ${type.join(", ")}\n\n`
	}
	message += `Credits to:\n\n${creds.join("\n")}`
	api.sendMessage(message, event.threadID, (error: any, message_: any) => {
		if(error) return react(api, event)
	})
}