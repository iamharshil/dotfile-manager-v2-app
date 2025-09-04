"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function NewRigPage() {
	return (
		<div className="flex-1 flex flex-col min-h-screen">
			<header className="flex items-center justify-between px-4 py-3 sm:px-8 bg-white dark:bg-[#222] backdrop-blur-md shadow-md sticky top-0 z-20">
				<h1 className="text-xl sm:text-2xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
					New Rig
				</h1>
			</header>

			<main className="flex-1 flex flex-col items-center justify-start px-2 sm:px-6 py-10 w-full transition-all bg-gradient-to-br from-[#f8fafc] via-[#e0e7ff] to-[#f0fdfa] dark:from-[#18181b] dark:via-[#22223b] dark:to-[#232946]">
				<section className="w-full max-w-lg mx-auto flex flex-col gap-8">
					<div className="flex flex-col gap-6 bg-white/80 dark:bg-[#222]/80 rounded-2xl p-8 shadow-xl backdrop-blur-lg border border-gray-200 dark:border-[#333]">
						<h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100 tracking-tight">
							Create a New Rig
						</h2>
						<form className="flex flex-col gap-6">
							<div className="flex flex-col gap-2">
								<Label
									htmlFor="rigName"
									className="text-base font-medium text-gray-700 dark:text-gray-200"
								>
									Rig Name
								</Label>
								<Input
									type="text"
									id="rigName"
									className="border border-gray-300 dark:border-[#444] rounded-lg px-4 py-3 bg-white/60 dark:bg-[#222]/60 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
									placeholder="Enter rig name"
								/>
							</div>
							<div className="flex flex-col gap-2">
								<Label
									htmlFor="rigDescription"
									className="text-base font-medium text-gray-700 dark:text-gray-200"
								>
									Description
								</Label>
								<Textarea
									id="rigDescription"
									className="border border-gray-300 dark:border-[#444] rounded-lg px-4 py-3 bg-white/60 dark:bg-[#222]/60 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
									rows={3}
									placeholder="Describe your rig..."
								/>
							</div>
							<div className="flex flex-col gap-2">
								<Label
									htmlFor="rigVisibility"
									className="text-base font-medium text-gray-700 dark:text-gray-200"
								>
									Visibility
								</Label>
								<Select defaultValue="public">
									<SelectTrigger className="border border-gray-300 dark:border-[#444] rounded-lg px-4 py-3 bg-white/60 dark:bg-[#222]/60 focus:outline-none focus:ring-2 focus:ring-pink-500 transition w-full">
										<SelectValue placeholder="Select visibility" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="public">🌐 Public</SelectItem>
										<SelectItem value="private">🔒 Private</SelectItem>
										<SelectItem value="unlisted">👁️ Unlisted</SelectItem>
									</SelectContent>
								</Select>
							</div>
							<button
								type="submit"
								className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:scale-105 hover:shadow-xl transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
							>
								Create Rig
							</button>
						</form>
					</div>
				</section>
			</main>
		</div>
	);
}
