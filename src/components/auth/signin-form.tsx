"use client";

import { LogIn } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const InitialData = {
	email: "",
	password: "",
};

export default function SignInForm() {
	const [initialData, setData] = React.useState<typeof InitialData | null>(InitialData);
	const [pending, setPending] = React.useState(false);
	const [errors, setErrors] = React.useState<{ email?: string; password?: string }>({});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setData((prev) => (prev ? { ...prev, [name]: value } : null));
		setErrors({});
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setPending(true);

		if (!initialData?.email || !initialData?.password) {
			return toast.error("All fields are required");
		}

		if (!initialData.email.includes("@")) {
			return toast.error("Please enter a valid email address");
		}

		if (!initialData.password || initialData.password.length < 6) {
			return toast.error("Password must be at least 6 characters long");
		}

		setPending(true);
		const response = await fetch("/api/auth/signin", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(initialData),
		});
		const res = await response.json();
		setPending(false);
		if (!response.ok) {
			if (res?.error) {
				const errorKey = Object.keys(res.error)[0] as keyof typeof errors;
				const errorValue = Object.values(res.error)[0] as string;
				return setErrors((prev) => ({
					...prev,
					[errorKey]: errorValue,
				}));
			}
			return toast.error(res.message || "Something went wrong. Please try again.");
		}

		return redirect("/dashboard");
	};

	return (
		<form className="flex flex-col gap-5 w-full" onSubmit={handleSubmit}>
			<div>
				<label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
					Email
				</label>
				<input
					id="email"
					type="email"
					name="email"
					onChange={handleChange}
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
					onChange={handleChange}
					required
					className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#222] text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
					placeholder="Your password"
				/>
			</div>
			<button
				type="submit"
				disabled={pending}
				className="w-full flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 shadow hover:scale-105 transition"
			>
				<LogIn size={20} />
				{pending ? "Logging in..." : "Login"}
			</button>
		</form>
	);
}
