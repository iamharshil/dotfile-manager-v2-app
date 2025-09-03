"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock } from "lucide-react";
import Link from "next/link";

export default function VerifyOtp() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const email = searchParams?.get("email") || "";
	const [otp, setOtp] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const [resent, setResent] = useState(false);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		setError(null);
		const res = await fetch("/api/auth/verify", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email, otp }),
		});
		const data = await res.json();
		setLoading(false);
		if (!res.ok || !data.success) {
			setError(data.error || "Invalid OTP");
			return;
		}
		// Redirect to signin
		router.replace("/auth/signin");
	};

	const handleResend = async () => {
		setLoading(true);
		setError(null);
		const res = await fetch("/api/auth/verify", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email, type: "register" }),
		});
		const data = await res.json();
		setLoading(false);
		if (!res.ok) {
			setError(data.error || "Failed to resend OTP");
		} else {
			setResent(true);
			setError(null);
		}
	};

	return (
		<div className="font-sans min-h-screen flex flex-col items-center justify-center bg-white dark:bg-[#181818] px-4">
			<main className="flex flex-col items-center justify-center w-full max-w-md mx-auto py-10 gap-8">
				<div className="flex flex-col items-center gap-4 w-full">
					<div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full p-4 flex justify-center items-center shadow-lg">
						<Lock size={40} className="text-white" />
					</div>
					<h1 className="text-2xl sm:text-3xl font-extrabold text-center bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
						Verify OTP
					</h1>
					<p className="text-base text-gray-700 dark:text-gray-300 text-center max-w-sm mx-auto">
						Enter the 6-digit code sent to <span className="font-semibold">{email}</span>.
					</p>
				</div>
				<form className="flex flex-col gap-5 w-full" onSubmit={handleSubmit}>
					<div>
						<label
							htmlFor="otp"
							className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
						>
							OTP Code
						</label>
						<input
							id="otp"
							type="text"
							inputMode="numeric"
							maxLength={6}
							required
							value={otp}
							onChange={(e) => setOtp(e.target.value)}
							className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#222] text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 tracking-widest text-center font-mono"
							placeholder="______"
						/>
					</div>
					{error && <p className="text-red-500 text-sm text-center">{error}</p>}
					<button
						type="submit"
						disabled={loading}
						className="w-full flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 shadow hover:scale-105 transition disabled:opacity-70"
					>
						{loading ? "Verifying..." : "Verify"}
					</button>
				</form>
				<div className="flex flex-col items-center gap-2 w-full mt-2">
					<button
						type="button"
						onClick={handleResend}
						disabled={loading}
						className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
					>
						Resend OTP
					</button>
					{resent && <span className="text-green-600 text-xs">OTP resent to your email.</span>}
				</div>
			</main>
			<footer className="w-full flex flex-wrap items-center justify-center gap-6 py-6 text-sm text-gray-500 dark:text-gray-400">
				<span>© {new Date().getFullYear()} Dotfile Manager</span>
			</footer>
		</div>
	);
}
