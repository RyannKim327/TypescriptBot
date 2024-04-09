import { commands } from './interfaces'

export const command_lists: commands[] = [
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
		script: "help",
		name: "Help Command",
		description: "A guide on how to use this bot and also on introduction",
		command: "help"
	},
	{
		script: "avd",
		name: "Audio Video Downloader Command",
		description: "This is just to send sample.",
		command: "avd ([\\w\\W]+)",
		hint: "avd (link)"
	},
	{
		script: "baybayin",
		name: "Baybayin Transliterator",
		description: "It transliterate alphabet characters into baybayin",
		command: "baybay ([\\w\\W]+)",
		hint: "baybay (your text)"
	},
	{
		script: "bible",
		name: "Bible Verse Command",
		description: "A command that sends your requested verses",
		command: "verse ([\\w\\W]+)",
		hint: "verse (bible verse(s))"
	},
	{
		script: "clear",
		name: "Query Clear for AI",
		description: "A command to clear the past queries for AI",
		command: "(thank you|ty|thanks|tnx|clear)"
	},
	{
		script: "image-generator",
		name: "Image Generator Command",
		description: "This is just an image generator",
		command: "imgen ([\\w\\W]+)",
		hint: "imgen (prompt)"
	},
	{
		script: "rickroll",
		name: "Special Command",
		description: "This is to send a special random message to your friend",
		command: "😗",
		type: ["message_reaction"]
	},
	{
		script: "music",
		name: "Youtube Music Command",
		description: "This is just to send a song you want.",
		command: "music ([\\w\\W]+)",
		hint: "music (search|link)"
	}
]
