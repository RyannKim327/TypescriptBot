import { commands } from './interfaces'

const command: commands[] = [
	{
		script: "check",
		name: "Checker",
		description: "This is just to check, wether the bot is still active or not",
		command: "check",
		adminCommand: true
	}
]

export function command_lists() {
	return command
}