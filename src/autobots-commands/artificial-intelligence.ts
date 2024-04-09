import axios from "axios";
import { react } from "../utilities";
import { addQuery, getQuery } from "../index";

export async function artificial_inteligence(api: any, event: any, preferences: any) {
	const b = event.body;
	let body = event.body;
	const q = getQuery(event.senderID);
	const user = await api.getUserInfo(event.senderID);
	const bot = await api.getUserInfo(api.getCurrentUserID());
	if (body.startsWith(preferences.prefix)) {
		body = body.substring(preferences.prefix.length);
	} else {
		body = body.substring(preferences.name.length);
	}
	body = `Hello my name is ${user[event.senderID]["name"]}, pretend that your name is ${bot[api.getCurrentUserID()]["name"]}, girlfriend of kyrios.afxisi. Now, here are my past queries and questions: ${q.join("\n")}. Now my next question is ${body}`;
	react(api, event, "🤔");
	const version = preferences.aiVersion;
	api.sendTypingIndicator(event.threadID, async (error: any) => {
		let { data } = await axios.get(
			`https://hercai.onrender.com/${version}/hercai?question=${body}`,
		);
		if (error)
			console.error(
				`Error [Artificial Inteligence typing]: ${error.error}`,
			);
		api.sendMessage(data.reply, event.threadID, (error: any, message: any) => {
			react(api, event, "");
			if (error)
			return console.error(`Error [AI]: ${JSON.stringify(error)}`);
			addQuery(b.substring(1), event.senderID);
			addQuery(data.reply, event.senderID);
		}, event.messageID);
	});
}
