"use client";

import { Compass, User, Globe, Lock, Link2, FileText, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";

// Dummy data for demonstration
const communityRigs = [
	{
		id: 101,
		name: "Arch Linux Power",
		description: "Minimal and blazing fast Arch setup.",
		author: "alex",
		visibility: "public",
		files: 10,
	},
	{
		id: 102,
		name: "MacOS Dev Rig",
		description: "All configs for MacOS dev workflow.",
		author: "emma",
		visibility: "public",
		files: 7,
	},
	{
		id: 103,
		name: "WSL Essentials",
		description: "WSL configs for productivity.",
		author: "john",
		visibility: "unlisted",
		files: 5,
	},
];

export default function ExplorePage() {
	const [search, setSearch] = useState("");

	const filteredRigs = communityRigs.filter(
		(rig) =>
			rig.name.toLowerCase().includes(search.toLowerCase()) ||
			rig.description.toLowerCase().includes(search.toLowerCase()) ||
			rig.author.toLowerCase().includes(search.toLowerCase())
	);

	return (
		<div className="flex-1 flex flex-col min-h-screen">
			<header className="flex items-center justify-between px-4 py-3 sm:px-8 bg-white dark:bg-[#222] backdrop-blur-md shadow-md sticky top-0 z-20">
				<h1 className="text-xl sm:text-2xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
					Explore Community Rigs
				</h1>
			</header>
			<main className="flex-1 flex flex-col items-center justify-start px-2 sm:px-6 py-6 w-full transition-all">
				<section className="w-full max-w-3xl mx-auto flex flex-col gap-8">
					<div className="flex items-center gap-2 w-full">
						<div className="relative w-full">
							<Input
								placeholder="Search community rigs..."
								value={search}
								onChange={(e) => setSearch(e.target.value)}
								className="pl-10 pr-4 py-2 rounded-lg bg-white dark:bg-[#222] shadow"
							/>
							<Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
						</div>
					</div>
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
						{filteredRigs.length === 0 ? (
							<div className="col-span-full text-center text-gray-500 dark:text-gray-400 py-8">
								No rigs found.
							</div>
						) : (
							filteredRigs.map((rig) => (
								<div
									key={rig.id}
									className="flex flex-col gap-3 bg-white dark:bg-[#222] rounded-xl p-5 shadow hover:scale-[1.02] transition-all"
								>
									<div className="flex items-center gap-2">
										<Compass size={20} className="text-purple-600 dark:text-purple-400" />
										<span className="font-semibold text-lg">{rig.name}</span>
										{rig.visibility === "public" ? (
											<Globe size={18} className="text-green-500" />
										) : (
											<Link2 size={18} className="text-blue-500" />
										)}
									</div>
									<p className="text-sm text-gray-600 dark:text-gray-400">{rig.description}</p>
									<div className="flex items-center gap-3 text-xs text-gray-500">
										<User size={16} />
										{rig.author}
										<FileText size={16} />
										{rig.files} files
									</div>
									<Button variant="outline" size="sm" className="flex items-center gap-1" asChild>
										<Link href={`/dashboard/rigs/${rig.id}`}>View Rig</Link>
									</Button>
								</div>
							))
						)}
					</div>
				</section>
			</main>
		</div>
	);
}
