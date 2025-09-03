import { generateToken } from "@/helper/common";
import { MESSAGES } from "@/helper/messages";
import { signInSchema } from "@/helper/validation";
import TokenModel from "@/models/Token.model";
import UserModel from "@/models/User.model";
import database from "@/utils/database";
import { setSession } from "@/utils/session";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
	try {
		const data = await req.json();

		const validate = signInSchema.safeParse(data);
		if (!validate?.success) {
			const fieldErrors = validate.error.flatten().fieldErrors;
			return NextResponse.json({ message: "Validation error!", error: fieldErrors }, { status: 400 });
		}

		await database();
		const user = await UserModel.findOne({ email: validate.data.email });
		if (!user?._id) {
			return NextResponse.json({ message: "Invalid email or password!" }, { status: 401 });
		}
		if (!user?.verified)
			return NextResponse.json({ message: "Please verify your email to login." }, { status: 403 });

		const token = await generateToken(user._id);
		const expiresAt = new Date(Date.now() + 60 * 60 * 24 * 1000);
		const ip =
			req.headers.get("x-vercel-ip") || req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "";
		const userAgent = req.headers.get("user-agent") || "";
		const country = req.headers.get("x-country") || "";

		await TokenModel.create({
			userId: user._id,
			token,
			expiresAt,
			ip,
			userAgent,
			country,
		});

		await setSession(token);
		user.lastLoggedIn = new Date();
		await user.save();
		return NextResponse.json({ message: "User logged in successfully." }, { status: 200 });
	} catch (error) {
		console.log(`⚠️ ~ ${new Date().toLocaleString()} ~ route.ts:4 ~ error:`, error);
		return NextResponse.json({ message: MESSAGES.default }, { status: 500 });
	}
};
