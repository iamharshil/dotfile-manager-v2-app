import { Lock } from "lucide-react";
import Link from "next/link";

export default function VerifyOtp() {
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
						Enter the 6-digit code sent to your email.
					</p>
				</div>
				<form className="flex flex-col gap-5 w-full">
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
							className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#222] text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 tracking-widest text-center font-mono"
							placeholder="______"
						/>
					</div>
					<button
						type="submit"
						className="w-full flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 shadow hover:scale-105 transition"
					>
						Verify
					</button>
				</form>
				<div className="flex flex-col items-center gap-2 w-full mt-2">
					<Link
						href="/auth/forgot-password"
						className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
					>
						Resend OTP
					</Link>
				</div>
			</main>
			<footer className="w-full flex flex-wrap items-center justify-center gap-6 py-6 text-sm text-gray-500 dark:text-gray-400">
				<span>© {new Date().getFullYear()} Dotfile Manager</span>
			</footer>
		</div>
	);
}
