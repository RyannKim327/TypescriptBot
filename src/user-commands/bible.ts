import { react } from "../utilities"

const bgs = require("biblegateway-scrape")

export async function main(api: any, event: any, regex: RegExp) {
	let data = await bgs.verse(event.body.match(regex)[1], bgs.version.TAG_ANG_DATING_BIBLIYA_1905)
	api.sendMessage(`${data[0].book}\n~ ${data[0].verse}`, event.threadID, (error: any, message: any) => {
		if(error){
			react(api, event)
		}
	})
}