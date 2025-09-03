"use client";

import { UserPlus } from "lucide-react";
import signupAction from "@/app/actions/action";
import React from "react";

// Optional: type for the action state
type ActionState = {
	success: boolean;
	error?: string;
};

export default function SignUpForm() {
	const initialState: ActionState = { success: false, error: "" };
	const [state, formAction, pending] = React.useActionState<ActionState, FormData>(signupAction as any, initialState);

	return (
		<form className="flex flex-col gap-5 w-full" action={formAction}>
			<div>
				<label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
					Name
				</label>
				<input
					id="name"
					type="text"
					name="name"
					required
					className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#222] text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
					placeholder="John"
				/>
			</div>
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
					placeholder="example@mail.com"
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
					placeholder="Enter a password"
				/>
			</div>
			<button
				type="submit"
				disabled={pending}
				aria-disabled={pending}
				className="w-full flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 shadow transition disabled:opacity-70 disabled:cursor-not-allowed hover:scale-105"
			>
				<UserPlus size={20} />
				{pending ? "Registering..." : "Register"}
			</button>
			{state?.error && (
				<p className="text-red-500 text-sm mt-2" role="alert">
					{state.error}
				</p>
			)}
		</form>
	);
}
