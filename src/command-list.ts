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
	}
]

export function command_lists() {
	return command
}