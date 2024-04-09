const fca = require("fca-unofficial");
import express, { Express } from "express";
import axios from "axios";
import { artificial_inteligence } from "./autobots-commands/artificial-intelligence";
import { command_lists } from "./command-list";
import { existsSync, mkdirSync, readFileSync, rm } from "fs";
import { react, readData, regex } from "./utilities";
import { commands } from "./interfaces";
import { exec } from "child_process";
import { posix } from "path";

const app: Express = express();

let admins: any[] = ["61555199001800"];
const attemptAdmin: any[] = [];

let pastQueries: any = {};

async function pushAdmin(api: any) {
	api.getThreadInfo(7045133965567738, async (error: any, data: any) => {
		if (error) return console.error(`Error [Push Admin]: ${error}`);
		admins = data.participantIDs;
	});
}

async function scan(api: any, event: any, preferences: any) {
	let lists: commands[] = command_lists;
	let notMatched = true;
	for (let i = 0; i < lists.length; i++) {
		let messageType = lists[i].type ?? ["message"];
		if (messageType.includes(event.type)) {
			if (event.type == "message_reaction") {
				if (lists[i].command == event.reaction) {
					notMatched = false;
					let folder = "user-commands";
					if (lists[i].adminCommand) {
						folder = "admin-commands";
					}
					if (
						lists[i].adminCommand &&
						!admins.includes(event.senderID)
					) {
						if (attemptAdmin.includes(event.senderID)) {
							return;
						}
						attemptAdmin.push(event.senderID);
						return api.sendMessage(
							"You don't have permission for admin commands",
							event.threadID,
						);
					}
					const { main } = require(`./${folder}/${lists[i].script}`);
					main(api, event);
				}
			} else if (lists[i].command) {
				let pref = regex(preferences.prefix + lists[i].command);
				if (pref.test(event.body)) {
					notMatched = false;
					let folder = "user-commands";
					if (lists[i].adminCommand) {
						folder = "admin-commands";
					}
					if (
						lists[i].adminCommand &&
						!admins.includes(event.senderID)
					) {
						if (attemptAdmin.includes(event.senderID)) {
							return;
						}
						attemptAdmin.push(event.senderID);
						return api.sendMessage(
							"You don't have permission for admin commands",
							event.threadID,
						);
					}
					const { main } = require(`./${folder}/${lists[i].script}`);
					if (
						lists[i].command?.includes("(") &&
						lists[i].command?.includes(")")
					) {
						react(api, event, "🌀");
						main(api, event, pref);
						react(api, event, "");
					} else {
						react(api, event, "🌀");
						main(api, event);
						react(api, event, "");
					}
				}
			} else if (lists[i].queries) {
				let pref = lists[i].queries ?? [""];
				for (let j = 0; j < pref.length; j++) {
					let name = regex(preferences.name + pref[j]);
					if (name.test(event.body)) {
						notMatched = false;
						let folder = "user-commands";
						if (lists[i].adminCommand) {
							folder = "admin-commands";
						}
						const { main } = require(
							`./${folder}/${lists[i].script}`,
						);
						if (
							lists[i].command?.includes("(") &&
							lists[i].command?.includes(")")
						) {
							react(api, event, "🌀");
							main(api, event, pref);
							react(api, event, "");
						} else {
							react(api, event, "🌀");
							main(api, event);
							react(api, event, "");
						}
					}
				}
			}
		}
	}
	if (
		notMatched &&
		event.type != "message_reaction" &&
		(event.body.startsWith(preferences.name) ||
			event.body.startsWith(preferences.prefix))
	) {
		artificial_inteligence(api, event, preferences);
	}
}

async function start() {
	let state = "privates/appstate.json";
	if (!existsSync(state)) {
		return console.error(
			`Please execute the Appstate generator first, before you proceed here.`,
		);
	}
	fca(
		{ appState: JSON.parse(readFileSync(state, "utf-8")) },
		async (error: JSON, api: any) => {
			if (error) {
				console.error(`Error [API]: ${JSON.stringify(error)}`);
				exec("npx ts-node /generator/appstate.ts", (e) => {
					if (e) console.error(`Generator Command: ${e}`);
				});
			} else {
				const selfListen: boolean = true;
				api.setOptions({
					listenEvents: true,
					selfListen: selfListen,
					logLevel: "silent",
				});
				if (selfListen) {
					admins.push(api.getCurrentUserID());
				}
				if (existsSync(`${__dirname}/../temp`)) {
					rm(
						`${__dirname}/../temp`,
						{ recursive: true },
						(error: any) => {
							if (error)
								return console.error(
									`Pre may error ${JSON.stringify(error)}`,
								);
							setTimeout(() => {
								mkdirSync(`${__dirname}/../temp`);
							}, 500);
						},
					);
				} else {
					mkdirSync(`${__dirname}/../temp`);
				}

				pushAdmin(api);

				api.listenMqtt(async (error: any, event: any) => {
					if (error)
						return console.error(
							`Error [Event] ${JSON.stringify(error)}`,
						);
					let preferences = readData("configurations/index.json");
					if (event.body != null || event.reaction != null) {
						scan(api, event, preferences);
					}
					// if (
					// 	event.type == "message_reaction" &&
					// 	event.senderID != api.getCurrentUserID()
					// ) {
					// 	setTimeout(() => {
					// 		api.setMessageReaction(
					// 			event.reaction,
					// 			event.messageID,
					// 			(e: any) => {},
					// 			true,
					// 		);
					// 	}, 1000)
					// }
				});
			}
		},
	);
}

export function addQuery(query: string, id: any) {
	if (pastQueries[id] == undefined) {
		pastQueries[id] = [];
	}
	pastQueries[id].push(query);
	while(pastQueries[id].join("\n").length > 1000){
		pastQueries[id].shift()
	}
	console.log(pastQueries)
}

export function clearQuery(id: any){
	pastQueries[id] = [];
}

export function getQuery(id: any) {
	if (pastQueries[id] != undefined) {
		return pastQueries[id];
	} else {
		return [];
	}
}

app.listen(3000, () => {
	console.log("SHOWTIME");
});

app.get("/", (req: any, res: any) => {
	res.send("GO");
});

if (!existsSync(`${__dirname}/../privates/appstate.json`)) {
	exec("npx ts-node /generator/appstate.ts", (e) => {
		if (e) console.error(`Error [Appstate Initiation]: ${e}`);
	});
}

start();

export function getAllAdmins() {
	return admins;
}

setInterval(() => {
	axios
		.get("http://localhost:3000")
		.then((r) => {
			console.log(r.data);
		})
		.catch((e) => {
			console.error(e);
		});
}, 1000);
