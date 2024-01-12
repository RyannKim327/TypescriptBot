import { commands } from './interfaces'

const command: commands[] = [
	{
		script: "ai-version",
		name: "AI Version Changer",
		description: "This is to change the version of the ai used",
		command: "change ai to ([\\w\\W]+)",
		adminCommand: true
	},
	{
		script: "check",
		name: "Checker",
		description: "This is just to check, weather the bot is still active or not",
		command: "check",
		adminCommand: true
	},
	{
		script: "music",
		name: "Youtube Music Command",
		description: "This is just to send a song you want.",
		command: "music ([\\w\\W]+)"
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