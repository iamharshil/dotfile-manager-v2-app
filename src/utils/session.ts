import { getIronSession, type IronSession } from "iron-session";
import { cookies } from "next/headers";

export interface SessionData {
	id?: string;
	// add other session properties as needed
}

const SESSION_CONFIG = {
	password: process.env.SESSION_PASSWORD as string,
	cookieName: "myapp_session",
	cookieOptions: {
		secure: process.env.NODE_ENV === "production",
	},
};

export async function getSession(): Promise<IronSession<SessionData>> {
	const cookieStore = await cookies();
	return await getIronSession<SessionData>(cookieStore, SESSION_CONFIG);
}
export async function setSession(id: string) {
	const cookieStore = await cookies();
	const session = await getIronSession<SessionData>(cookieStore, SESSION_CONFIG);
	session.id = id;
	await session.save();
}

export async function destroySession() {
	const cookieStore = await cookies();
	const session = await getIronSession<SessionData>(cookieStore, SESSION_CONFIG);
	session.destroy();
}
