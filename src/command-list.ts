import { commands } from './interfaces'

const command: commands[] = [
	{
		script: "ai-version",
		name: "AI Version Changer",
		description: "This is to change the version of the ai used",
		command: "change ai to ([\\w\\W]+)",
		hint: "change ai to (v3|v3-32k|gemini|turbo|turbo-16k)",
		adminCommand: true
	},
	{
		script: "check",
		name: "Checker",
		description: "This is just to check, weather the bot is still active or not",
		command: "check",
		adminCommand: true
	},{
		script: "prefix",
		name: "Prefix Changer",
		description: "To change the prefix",
		command: "prefix ([^\\w\\S]{1})",
		hint: "prefix (any special character aside \\)",
		adminCommand: true
	},
	{
		script: "music",
		name: "Youtube Music Command",
		description: "This is just to send a song you want.",
		command: "music ([\\w\\W]+)",
		hint: "music (search|link)"
	},{
		script: "help",
		name: "Help Command",
		description: "A guide on how to use this bot and also on introduction",
		command: "f1"
	},
	{
		script: "rickroll",
		name: "Rickroll Command",
		description: "This is to rickroll your friend",
		command: "rickroll",
		type: ["message_reply"]
	}
]

export function command_lists() {
	return command
}