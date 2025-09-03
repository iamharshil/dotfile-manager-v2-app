import { NextResponse } from "next/server";
import database from "@/utils/database";
import TokenModel from "@/models/Token.model";
import { getSession } from "@/utils/session";

export async function GET() {
	try {
		await database();

		const token = (await getSession())?.id;
		await TokenModel.findOneAndDelete({ token });

		return NextResponse.json({ message: "Logged out successfully" });
	} catch (error) {
		console.log(`⚠️ ~ ${new Date().toLocaleString()} ~ route.ts:15 ~ error:`, error);
		return NextResponse.json({ message: "Something went wrong, please try again!" }, { status: 400 });
	}
}
