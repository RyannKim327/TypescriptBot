import { existsSync, mkdir, mkdirSync, readFileSync, writeFileSync } from "fs";
const fca = require("mirai-fca-unofficial")

export async function generator(username: string|undefined, password: string|undefined) {

	fca({
		email: username || "", 
		password: password || ""
	}, (error: any, api: any) => {
		if (error)
			return {
				ok: false
			}
		// if (!existsSync(`${__dirname}/../privates/`)) {
			// mkdirSync(`${__dirname}/../privates/`);
		// }
		let data = JSON.parse(readFileSync("configurations/appstates.json", "utf-8"))
		data['accounts'].push(JSON.stringify(api.getAppState()))
		writeFileSync(
			"configurations/appstates.json",
			JSON.stringify(data, null, 4),
			"utf-8",
		);
		console.log("We did it. Hooooraaaay!!!!")
		return {
			ok: true,
			state: JSON.stringify(api.getAppState())
		}
	})
}
