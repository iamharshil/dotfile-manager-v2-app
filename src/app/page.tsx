import { UserPlus, LogIn, RefreshCcw, Lock, History, Share2 } from "lucide-react";

export default function Home() {
	return (
		<div className="relative font-sans min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-blue-100 via-purple-100 to-pink-200 dark:from-[#181818] dark:via-[#222] dark:to-[#333]">
			{/* Modern gradient blobs */}
			<div className="absolute inset-0 -z-10 pointer-events-none">
				<div className="absolute top-[-15%] left-[-15%] w-[350px] h-[350px] bg-gradient-to-tr from-blue-400/40 via-purple-400/30 to-pink-400/40 rounded-full blur-3xl opacity-70" />
				<div className="absolute bottom-[-20%] right-[-15%] w-[400px] h-[400px] bg-gradient-to-br from-pink-400/40 via-purple-400/30 to-blue-400/40 rounded-full blur-3xl opacity-60" />
				<div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[220px] h-[220px] bg-gradient-to-r from-blue-300/30 via-purple-300/20 to-pink-300/30 rounded-full blur-2xl opacity-40" />
			</div>

			<main className="flex flex-col items-center justify-center w-full max-w-2xl px-4 sm:px-8 py-10 sm:py-20 gap-10">
				<div className="flex flex-col items-center gap-4 w-full">
					<div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full p-5 flex justify-center items-center shadow-lg shadow-purple-200/30 dark:shadow-none">
						<RefreshCcw size={56} className="text-white" />
					</div>
					<h1 className="text-3xl sm:text-5xl font-extrabold text-center bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent dark:from-blue-400 dark:via-purple-400 dark:to-pink-400">
						Dotfile Manager
					</h1>
					<p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 text-center max-w-xl mx-auto">
						Securely store, manage, and sync your configuration files and dotfiles across devices.
						<br className="hidden sm:inline" />
						Never lose your setup again!
					</p>
				</div>

				<div className="flex flex-col sm:flex-row gap-4 w-full justify-center items-center">
					<a
						className="rounded-full border-none transition-all flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 text-white gap-2 hover:scale-105 hover:from-blue-700 hover:to-purple-700 font-semibold text-base sm:text-lg h-12 px-8 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
						href="/auth/signup"
						aria-label="Sign up and get started"
					>
						<UserPlus size={22} className="mr-1" />
						Get Started
					</a>
					<a
						className="rounded-full border border-blue-600 dark:border-blue-400 transition-all flex items-center justify-center bg-white dark:bg-[#222] hover:bg-blue-50 dark:hover:bg-blue-900 font-semibold text-base sm:text-lg h-12 px-8 text-blue-700 dark:text-blue-300 shadow focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 hover:scale-105"
						href="/auth/signin"
						aria-label="Login to your account"
					>
						<LogIn size={22} className="mr-1" />
						Login
					</a>
				</div>

				<section className="mt-8 w-full flex flex-col items-center">
					<h2 className="text-xl sm:text-2xl font-semibold mb-4 text-center">Features</h2>
					<ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg mx-auto">
						<li className="flex items-center gap-3 justify-center bg-white/60 dark:bg-[#222]/60 rounded-xl py-3 px-4 shadow hover:scale-[1.03] transition-all">
							<RefreshCcw size={22} className="text-blue-600 dark:text-blue-400" />
							<span className="font-medium">Sync dotfiles across devices</span>
						</li>
						<li className="flex items-center gap-3 justify-center bg-white/60 dark:bg-[#222]/60 rounded-xl py-3 px-4 shadow hover:scale-[1.03] transition-all">
							<Lock size={22} className="text-purple-600 dark:text-purple-400" />
							<span className="font-medium">Secure cloud storage</span>
						</li>
						<li className="flex items-center gap-3 justify-center bg-white/60 dark:bg-[#222]/60 rounded-xl py-3 px-4 shadow hover:scale-[1.03] transition-all">
							<History size={22} className="text-pink-600 dark:text-pink-400" />
							<span className="font-medium">Version history & restore</span>
						</li>
						<li className="flex items-center gap-3 justify-center bg-white/60 dark:bg-[#222]/60 rounded-xl py-3 px-4 shadow hover:scale-[1.03] transition-all">
							<Share2 size={22} className="text-blue-500 dark:text-blue-300" />
							<span className="font-medium">Share configs with others</span>
						</li>
					</ul>
				</section>
			</main>

			<footer className="w-full flex flex-wrap items-center justify-center gap-6 py-6 text-sm text-gray-500 dark:text-gray-400 bg-transparent">
				<a className="flex items-center gap-2 hover:underline hover:underline-offset-4" href="/about">
					About
				</a>
				<a className="flex items-center gap-2 hover:underline hover:underline-offset-4" href="/docs">
					Docs
				</a>
				<a className="flex items-center gap-2 hover:underline hover:underline-offset-4" href="/contact">
					Contact
				</a>
				<span className="hidden sm:inline">© {new Date().getFullYear()} Dotfile Manager</span>
			</footer>
		</div>
	);
}
