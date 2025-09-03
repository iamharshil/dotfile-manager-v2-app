"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { signInSchema, signUpSchema } from "@/helper/validation";
import database from "@/utils/database";
import UserModel from "@/models/User.model";
import { comparePassword, generateToken, hashPassword } from "@/helper/common";
import TokenModel from "@/models/Token.model";
import { headers } from "next/headers";
import { userAgent } from "next/server";
import { destroySession, getSession, setSession } from "@/utils/session";

export default async function signupAction(_: unknown, formData: FormData) {
	const data = {
		name: formData.get("name"),
		email: formData.get("email"),
		password: formData.get("password"),
	};

	const validated = signUpSchema.safeParse(data);
	if (!validated.success) {
		return { success: false, error: validated.error.issues[0]?.message ?? "Invalid input" };
	}

	await database();

	const exists = await UserModel.findOne({ email: data.email });
	if (exists?._id) {
		return { success: false, error: "Email already exists" };
	}

	const hashedPassword = await hashPassword(data.password as string);
	await UserModel.create({
		name: data.name,
		email: data.email,
		password: hashedPassword,
	});

	// Keep this path consistent with your routes (you used /auth/signin elsewhere)
	redirect("/auth/signin");
}

export const signinAction = async (_: unknown, formData: FormData) => {
	const data = {
		email: formData.get("email"),
		password: formData.get("password"),
	};

	const validated = signInSchema.safeParse(data);
	if (!validated.success) {
		return { success: false, error: validated.error.issues[0]?.message ?? "Invalid input" };
	}

	await database();

	const user = await UserModel.findOne({ email: data.email });
	if (!user) {
		return { success: false, error: "User not found" };
	}

	const isValid = await comparePassword(data.password as string, user.password);
	if (!isValid) {
		return { success: false, error: "Invalid password" };
	}

	// Set user session or token here
	const token = await generateToken(user._id);
	const ip =
		(await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() || (await headers()).get("x-real-ip") || "";
	const userAgent = (await headers()).get("user-agent") || "";
	const tokenData = {
		userId: user._id,
		token,
		ip,
		userAgent,
		expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
	};

	const exists = await TokenModel.findOne({ userId: user._id });
	if (exists) {
		exists.token = token;
		exists.ip = ip;
		exists.expiresAt = tokenData.expiresAt;
		await exists.save();
	} else {
		await TokenModel.create(tokenData);
	}

	await setSession(token);

	redirect("/dashboard");
};

export const signOutAction = async () => {
	const token = await getSession();
	if (!token) return;

	await TokenModel.deleteOne({ token: token.id });
	await destroySession();

	redirect("/auth/signin");
};
