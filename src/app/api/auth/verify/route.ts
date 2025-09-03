import { NextResponse } from "next/server";
import UserModel from "@/models/User.model";
import database from "@/utils/database";
import { generateOtp } from "@/helper/common";
import mailer from "@/utils/mailer";

export const POST = async (req: Request) => {
	try {
		const { email, otp, type = "register" } = await req.json();
		await database();
		const user = await UserModel.findOne({ email });
		if (!user) {
			return NextResponse.json({ success: false, error: "User not found." }, { status: 404 });
		}
		// Check if already verified
		if (user.verified) {
			return NextResponse.json({ success: true, message: "Already verified." });
		}
		// Check OTP expiry
		if (!user.otpExpires || user.otpExpires < new Date()) {
			// Expired, generate new OTP
			const newOtp = generateOtp();
			const newExpires = new Date(Date.now() + 10 * 60 * 1000);
			await UserModel.updateOne({ email }, { otp: newOtp, otpExpires: newExpires, otpRetries: 0 });
			// Send new OTP
			const html = `<div style='font-family: Geist, Inter, sans-serif; background: #f8fafc; padding: 32px; border-radius: 16px; max-width: 400px; margin: auto; box-shadow: 0 2px 12px 0 #e0e7ef;'><div style='text-align: center;'><div style='background: linear-gradient(90deg, #2563eb, #7c3aed, #ec4899); border-radius: 50%; width: 56px; height: 56px; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px auto;'><span style='font-size: 2rem; color: #fff; font-weight: bold;'>🔒</span></div><h2 style='background: linear-gradient(90deg, #2563eb, #7c3aed, #ec4899); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-size: 1.5rem; font-weight: 800; margin-bottom: 8px;'>Verify your email</h2><p style='color: #334155; font-size: 1rem; margin-bottom: 24px;'>Welcome to Dotfile Manager! Enter the code below to verify your account.</p><div style='font-size: 2rem; font-weight: bold; letter-spacing: 0.2em; color: #2563eb; background: #e0e7ef; padding: 12px 0; border-radius: 8px; margin-bottom: 24px;'>${newOtp}</div><p style='color: #64748b; font-size: 0.95rem;'>This code will expire in 10 minutes. If you did not request this, please ignore this email.</p><div style='margin-top: 32px; color: #94a3b8; font-size: 0.8rem;'>© ${new Date().getFullYear()} Dotfile Manager</div></div></div>`;
			await mailer(type, { to: email, subject: "Your Dotfile Manager OTP Code", html });
			return NextResponse.json({ success: false, error: "OTP expired. New OTP sent." }, { status: 400 });
		}
		// Check OTP
		if (user.otp !== otp) {
			// Increment retry
			let retries = user.otpRetries ?? 0;
			retries++;
			if (retries >= 5) {
				// Generate new OTP
				const newOtp = generateOtp();
				const newExpires = new Date(Date.now() + 10 * 60 * 1000);
				await UserModel.updateOne({ email }, { otp: newOtp, otpExpires: newExpires, otpRetries: 0 });
				// Send new OTP
				const html = `<div style='font-family: Geist, Inter, sans-serif; background: #f8fafc; padding: 32px; border-radius: 16px; max-width: 400px; margin: auto; box-shadow: 0 2px 12px 0 #e0e7ef;'><div style='text-align: center;'><div style='background: linear-gradient(90deg, #2563eb, #7c3aed, #ec4899); border-radius: 50%; width: 56px; height: 56px; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px auto;'><span style='font-size: 2rem; color: #fff; font-weight: bold;'>🔒</span></div><h2 style='background: linear-gradient(90deg, #2563eb, #7c3aed, #ec4899); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-size: 1.5rem; font-weight: 800; margin-bottom: 8px;'>Verify your email</h2><p style='color: #334155; font-size: 1rem; margin-bottom: 24px;'>Welcome to Dotfile Manager! Enter the code below to verify your account.</p><div style='font-size: 2rem; font-weight: bold; letter-spacing: 0.2em; color: #2563eb; background: #e0e7ef; padding: 12px 0; border-radius: 8px; margin-bottom: 24px;'>${newOtp}</div><p style='color: #64748b; font-size: 0.95rem;'>This code will expire in 10 minutes. If you did not request this, please ignore this email.</p><div style='margin-top: 32px; color: #94a3b8; font-size: 0.8rem;'>© ${new Date().getFullYear()} Dotfile Manager</div></div></div>`;
				await mailer(type, { to: email, subject: "Your Dotfile Manager OTP Code", html });
				return NextResponse.json(
					{ success: false, error: "Too many attempts. New OTP sent." },
					{ status: 400 }
				);
			} else {
				await UserModel.updateOne({ email }, { otpRetries: retries });
				return NextResponse.json(
					{ success: false, error: `Invalid OTP. ${5 - retries} attempts left.` },
					{ status: 400 }
				);
			}
		}
		// OTP valid
		await UserModel.updateOne({ email }, { verified: true, otp: null, otpExpires: null, otpRetries: 0 });
		return NextResponse.json({
			success: true,
			message: "Account verified. You can now login.",
			redirect: "/auth/signin",
		});
	} catch (error) {
		console.log("OTP verify error:", error);
		return NextResponse.json({ success: false, error: "Server error." }, { status: 500 });
	}
};
