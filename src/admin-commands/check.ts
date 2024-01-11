import { react } from "../utilities"

export function main(api: any, event: any){
	react(api, event, "❤️")
	setTimeout(() => {
		react(api, event, "")
	}, 5000)
}