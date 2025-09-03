import { MESSAGES } from "@/helper/messages";
import { signUpSchema } from "@/helper/validation";
import UserModel from "@/models/User.model";
import database from "@/utils/database";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
	try {
		const data = await req.json();

		const validate = signUpSchema.safeParse(data);
		if (!validate?.success) {
			const fieldErrors = validate.error.flatten().fieldErrors;
			return NextResponse.json({ message: "Validation error!", error: fieldErrors }, { status: 400 });
		}

		await database();
		const exists = await UserModel.findOne({ email: validate.data.email });
		if (exists?._id) {
			return NextResponse.json({ message: "User already exists!" }, { status: 409 });
		}

		await UserModel.create(validate.data);
		return NextResponse.json({ message: "User registered successfully." }, { status: 201 });
	} catch (error) {
		console.log(`⚠️ ~ ${new Date().toLocaleString()} ~ error:`, error);
		return NextResponse.json({ message: MESSAGES.default }, { status: 500 });
	}
};
