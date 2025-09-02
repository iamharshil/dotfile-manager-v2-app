"use client";

import { Settings, User, Lock, Globe, Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function SettingsPage() {
	const [name, setName] = useState("Harshil");
	const [email, setEmail] = useState("harshil@email.com");
	const [visibility, setVisibility] = useState("private");

	return (
		<div className="flex-1 flex flex-col min-h-screen">
			<header className="flex items-center justify-between px-4 py-3 sm:px-8 bg-white dark:bg-[#222] backdrop-blur-md shadow-md sticky top-0 z-20">
				<h1 className="text-xl sm:text-2xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
					Settings
				</h1>
			</header>
			<main className="flex-1 flex flex-col items-center justify-start px-2 sm:px-6 py-6 w-full transition-all">
				<section className="w-full max-w-xl mx-auto flex flex-col gap-8">
					<form className="flex flex-col gap-5 bg-white dark:bg-[#222] rounded-xl p-5 shadow">
						<div className="flex items-center gap-2 mb-2">
							<Settings size={22} className="text-blue-600 dark:text-blue-400" />
							<span className="font-semibold text-lg">Profile Settings</span>
						</div>
						<div>
							<label
								htmlFor="name"
								className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
							>
								Name
							</label>
							<Input
								id="name"
								type="text"
								value={name}
								onChange={(e) => setName(e.target.value)}
								required
								className="w-full"
								placeholder="Your name"
							/>
						</div>
						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
							>
								Email
							</label>
							<Input
								id="email"
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
								className="w-full"
								placeholder="Your email"
							/>
						</div>
						<div>
							<span className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
								Default Visibility
							</span>
							<div className="flex gap-2">
								<Button
									type="button"
									variant={visibility === "private" ? "default" : "outline"}
									onClick={() => setVisibility("private")}
									size="sm"
								>
									<Lock size={16} className="mr-1" />
									Private
								</Button>
								<Button
									type="button"
									variant={visibility === "public" ? "default" : "outline"}
									onClick={() => setVisibility("public")}
									size="sm"
								>
									<Globe size={16} className="mr-1" />
									Public
								</Button>
								<Button
									type="button"
									variant={visibility === "unlisted" ? "default" : "outline"}
									onClick={() => setVisibility("unlisted")}
									size="sm"
								>
									<Link2 size={16} className="mr-1" />
									Unlisted
								</Button>
							</div>
						</div>
						<div className="flex gap-2 justify-end mt-4">
							<Button type="submit" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
								Save Changes
							</Button>
						</div>
					</form>
				</section>
			</main>
		</div>
	);
}
