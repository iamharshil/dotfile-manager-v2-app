"use client";

import { UserPlus } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";

const InitialData = {
	name: "",
	email: "",
	password: "",
};

export default function SignUpForm() {
	const [initialData, setData] = React.useState<typeof InitialData | null>(InitialData);
	const [isDisabled, setIsDisabled] = React.useState(false);
	const [errors, setErrors] = React.useState<{ name?: string; email?: string; password?: string }>({});
	const [showPassword, setShowPassword] = React.useState(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setData((prev) => (prev ? { ...prev, [name]: value } : null));
		setErrors({});
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsDisabled(true);

		if (!initialData?.name || !initialData?.email || !initialData?.password) {
			return toast.error("All fields are required");
		}

		if (!initialData.email.includes("@")) {
			return toast.error("Please enter a valid email address");
		}

		if (!initialData.password || initialData.password.length < 6) {
			return toast.error("Password must be at least 6 characters long");
		}

		if (!initialData.name || initialData.name.trim() === "") {
			return toast.error("Name is required");
		}

		if (initialData.name?.length < 3) {
			return toast.error("Name must be at least 3 characters long");
		}

		setIsDisabled(true);
		const response = await fetch("/api/auth/signup", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(initialData),
		});
		const res = await response.json();
		setIsDisabled(false);
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

		// Redirect to OTP verify page with email
		return redirect(`/auth/verify?email=${encodeURIComponent(initialData.email)}`);
	};

	return (
		<form className="flex flex-col gap-5 w-full" onSubmit={handleSubmit}>
			<div>
				<label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
					Name
				</label>
				<input
					id="name"
					type="text"
					name="name"
					onChange={handleChange}
					required
					className={`w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#222] text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
						errors?.name ? "border-red-500" : ""
					}`}
					placeholder="John"
				/>
				{errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
			</div>
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
					className={`w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#222] text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
						errors?.email ? "border-red-500" : ""
					}`}
					placeholder="example@mail.com"
				/>
				{errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
			</div>
			<div>
				<label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
					Password
				</label>
				<div className="relative">
					<input
						id="password"
						type={showPassword ? "text" : "password"}
						name="password"
						onChange={handleChange}
						required
						className={`w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#222] text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
							errors?.password ? "border-red-500" : ""
						}`}
						placeholder="Enter a password"
					/>
					<button
						type="button"
						className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400"
						onClick={() => setShowPassword((prev) => !prev)}
						tabIndex={-1}
						aria-label={showPassword ? "Hide password" : "Show password"}
					>
						{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
					</button>
				</div>
				{errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
			</div>
			<button
				type="submit"
				disabled={isDisabled}
				aria-disabled={isDisabled}
				className="w-full flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 shadow transition disabled:opacity-70 disabled:cursor-not-allowed hover:scale-105"
			>
				<UserPlus size={20} />
				{isDisabled ? "Registering..." : "Register"}
			</button>
		</form>
	);
}
