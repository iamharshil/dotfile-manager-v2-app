import SignInForm from "@/components/auth/signin-form";
import { LogIn, UserPlus } from "lucide-react";
import Link from "next/link";

export default function Login() {
	return (
		<div className="font-sans min-h-screen flex flex-col items-center justify-center bg-white dark:bg-[#181818] px-4">
			<main className="flex flex-col items-center justify-center w-full max-w-md mx-auto py-10 gap-8">
				<div className="flex flex-col items-center gap-4 w-full">
					<div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full p-4 flex justify-center items-center shadow-lg">
						<LogIn size={40} className="text-white" />
					</div>
					<h1 className="text-2xl sm:text-3xl font-extrabold text-center bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
						Login to Dotfile Manager
					</h1>
					<p className="text-base text-gray-700 dark:text-gray-300 text-center max-w-sm mx-auto">
						Access your dotfiles and configs securely.
					</p>
				</div>
				<SignInForm />
				<div className="flex flex-col items-center gap-2 w-full mt-2">
					<Link href="/auth/signup" className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
						New here? Register
					</Link>
					<Link
						href="/auth/forgot-password"
						className="text-gray-500 dark:text-gray-400 hover:underline text-xs"
					>
						Forgot password?
					</Link>
				</div>
			</main>
			<footer className="w-full flex flex-wrap items-center justify-center gap-6 py-6 text-sm text-gray-500 dark:text-gray-400">
				<span>© {new Date().getFullYear()} Dotfile Manager</span>
			</footer>
		</div>
	);
}
