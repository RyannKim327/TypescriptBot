import { existsSync, mkdir, mkdirSync, readFileSync, writeFileSync } from "fs";
const fca = require("mirai-fca-unofficial")
import { exec } from 'child_process'

async function a() {
	const email: string | undefined = process.env.email
	const password: string | undefined = process.env.password

	fca({
		email: email,
		password: password,
	}, (error: any, api: any) => {
		if (error)
			return console.error(
				`Error [Appstate maker]: ${JSON.stringify(error)}`,
			);
		if (!existsSync(`${__dirname}/../privates/`)) {
			mkdirSync(`${__dirname}/../privates/`);
		}
		writeFileSync(
			"privates/appstate.json",
			JSON.stringify(api.getAppState(), null, 4),
			"utf-8",
		);
		console.log("We did it. Hooooraaaay!!!!")
		exec("rs", (e) => {
			if(e) console.error(`Error [Appstate]: ${e}`)
		})
	})
}

a();
