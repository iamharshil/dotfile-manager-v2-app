"use client";

import { signinAction } from "@/app/actions/action";
import { LogIn } from "lucide-react";

import React from "react";

type ActionState = {
	success: boolean;
	error?: string;
};

export default function SignInForm() {
	const initialState: ActionState = { success: false, error: "" };
	const [state, formAction, pending] = React.useActionState<ActionState, FormData>(signinAction as any, initialState);

	return (
		<form className="flex flex-col gap-5 w-full" action={formAction}>
			<div>
				<label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
					Email
				</label>
				<input
					id="email"
					type="email"
					name="email"
					required
					className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#222] text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
					placeholder="you@email.com"
				/>
			</div>
			<div>
				<label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
					Password
				</label>
				<input
					id="password"
					type="password"
					name="password"
					required
					className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#222] text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
					placeholder="Your password"
				/>
			</div>
			<button
				type="submit"
				className="w-full flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 shadow hover:scale-105 transition"
			>
				<LogIn size={20} />
				{pending ? "Logging in..." : "Login"}
			</button>
			{state?.error && <p className="text-red-500 text-sm mt-2">{state.error}</p>}
		</form>
	);
}
