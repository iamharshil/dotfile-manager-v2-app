import { MESSAGES } from "@/helper/messages";
import { signUpSchema } from "@/helper/validation";
import UserModel from "@/models/User.model";
import database from "@/utils/database";
import { NextResponse } from "next/server";
import { generateOtp } from "@/helper/common";
import mailer from "@/utils/mailer";

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

		// Generate OTP and expiry
		const otp = generateOtp();
		const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 min expiry
		const otpRetries = 0;

		await UserModel.create({
			...validate.data,
			otp,
			otpExpires,
			otpRetries,
			verified: false,
		});

		// Send OTP email
		const html = `
			<div style="font-family: 'Geist', 'Inter', Arial, sans-serif; background: #f4f6fb; padding: 32px 24px; border-radius: 16px; max-width: 420px; margin: 32px auto; box-shadow: 0 4px 24px 0 #e0e7ef;">
				<div style="text-align: center;">
					<div style="background: linear-gradient(90deg, #2563eb, #7c3aed, #ec4899); border-radius: 50%; width: 56px; height: 56px; display: flex; align-items: center; justify-content: center; margin: 0 auto 18px auto;">
						<span style="font-size: 2.2rem; color: #fff;">🔒</span>
					</div>
					<h2 style="background: linear-gradient(90deg, #2563eb, #7c3aed, #ec4899); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-size: 1.4rem; font-weight: 900; margin-bottom: 10px; letter-spacing: 0.02em;">Verify your email</h2>
					<p style="color: #334155; font-size: 1.05rem; margin-bottom: 22px;">Welcome to <b>Dotfile Manager</b>! Enter the code below to verify your account.</p>
					<div style="font-size: 2.1rem; font-weight: 900; letter-spacing: 0.25em; color: #2563eb; background: #e0e7ef; padding: 14px 0; border-radius: 10px; margin-bottom: 22px; box-shadow: 0 2px 8px #e0e7ef;">${otp}</div>
					<p style="color: #64748b; font-size: 0.97rem; margin-bottom: 8px;">This code will expire in <b>10 minutes</b>.</p>
					<p style="color: #64748b; font-size: 0.97rem;">If you did not request this, you can safely ignore this email.</p>
					<hr style="margin: 32px 0 16px 0; border: none; border-top: 1px solid #e0e7ef;">
					<div style="color: #94a3b8; font-size: 0.82rem;">&copy; ${new Date().getFullYear()} Dotfile Manager</div>
				</div>
			</div>
		`;
		await mailer("register", {
			to: validate.data.email,
			subject: "Your Dotfile Manager OTP Code",
			html,
		});

		return NextResponse.json(
			{
				message: "User registered successfully. OTP sent.",
				redirect: "/auth/verify",
			},
			{ status: 201 }
		);
	} catch (error) {
		console.log(`⚠️ ~ ${new Date().toLocaleString()} ~ error:`, error);
		return NextResponse.json({ message: MESSAGES.default }, { status: 500 });
	}
};
