"use client";

import { Server, Lock, Globe, Link2, FileText, Eye, Edit, Trash2, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";

// Dummy data for demonstration
const rigs = [
	{
		id: 1,
		name: "Linux Workstation",
		description: "My personal Linux rig setup.",
		visibility: "private",
		lastUpdated: "2 days ago",
		files: 12,
	},
	{
		id: 2,
		name: "MacBook Pro",
		description: "Configs for MacOS dev rig.",
		visibility: "public",
		lastUpdated: "5 hours ago",
		files: 8,
	},
	{
		id: 3,
		name: "WSL Dev",
		description: "WSL rig and scripts.",
		visibility: "private",
		lastUpdated: "1 week ago",
		files: 5,
	},
	{
		id: 4,
		name: "Neovim Rig",
		description: "Neovim plugins and settings.",
		visibility: "public",
		lastUpdated: "3 days ago",
		files: 3,
	},
	{
		id: 5,
		name: "Zsh Terminal",
		description: "Custom Zsh prompt and aliases.",
		visibility: "unlisted",
		lastUpdated: "4 hours ago",
		files: 2,
	},
];

export default function RigsPage() {
	const [search, setSearch] = useState("");
	const [deleteId, setDeleteId] = useState<number | null>(null);

	const filteredRigs = rigs.filter(
		(rig) =>
			rig.name.toLowerCase().includes(search.toLowerCase()) ||
			rig.description.toLowerCase().includes(search.toLowerCase())
	);

	return (
		<div className="flex-1 flex flex-col min-h-screen">
			<header className="flex items-center justify-between px-4 py-3 sm:px-8 bg-white dark:bg-[#222] backdrop-blur-md shadow-md sticky top-0 z-20">
				<h1 className="text-xl sm:text-2xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
					My Rigs
				</h1>
				<Button
					className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold px-5 py-2 rounded-full shadow hover:scale-105 transition"
					asChild
				>
					<Link href="/dashboard/rigs/new">
						<Plus size={18} />
						New Rig
					</Link>
				</Button>
			</header>

			<main className="flex-1 flex flex-col items-center justify-start px-2 sm:px-6 py-6 w-full transition-all">
				<section className="w-full max-w-3xl mx-auto flex flex-col gap-8">
					{/* Search Bar */}
					<div className="flex items-center gap-2 w-full">
						<div className="relative w-full">
							<Input
								placeholder="Search your rigs..."
								value={search}
								onChange={(e) => setSearch(e.target.value)}
								className="pl-10 pr-4 py-2 rounded-lg bg-white dark:bg-[#222] shadow"
							/>
							<Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
						</div>
					</div>

					{/* Rigs Section */}
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
						{filteredRigs.length === 0 ? (
							<div className="col-span-full text-center text-gray-500 dark:text-gray-400 py-8">
								No rigs found.
							</div>
						) : (
							filteredRigs.map((rig) => (
								<RigCard key={rig.id} rig={rig} onDelete={() => setDeleteId(rig.id)} />
							))
						)}
					</div>
				</section>
			</main>

			{/* Delete Modal */}
			{deleteId !== null && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
					<div className="bg-white dark:bg-[#222] rounded-xl shadow-lg p-6 w-full max-w-md mx-2">
						<h2 className="text-xl font-bold mb-4 text-center">Delete Rig</h2>
						<p className="text-center text-gray-700 dark:text-gray-300 mb-6">
							Are you sure you want to delete this rig? This action cannot be undone.
						</p>
						<div className="flex gap-2 justify-center">
							<Button variant="ghost" onClick={() => setDeleteId(null)}>
								Cancel
							</Button>
							<Button
								className="bg-gradient-to-r from-red-600 to-pink-600 text-white"
								onClick={() => {
									// Handle delete logic here
									setDeleteId(null);
								}}
							>
								Delete
							</Button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

function RigCard({ rig, onDelete }: { rig: any; onDelete: () => void }) {
	const visibilityIcon =
		rig.visibility === "private" ? (
			<Lock size={18} className="text-gray-500" />
		) : rig.visibility === "public" ? (
			<Globe size={18} className="text-green-500" />
		) : (
			<Link2 size={18} className="text-blue-500" />
		);

	return (
		<div className="flex flex-col gap-3 bg-white dark:bg-[#222] rounded-xl p-5 shadow hover:scale-[1.02] transition-all">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<Server size={20} className="text-blue-600 dark:text-blue-400" />
					<span className="font-semibold text-lg">{rig.name}</span>
					{visibilityIcon}
				</div>
				<span className="text-xs text-gray-400">{rig.lastUpdated}</span>
			</div>
			<p className="text-sm text-gray-600 dark:text-gray-400">{rig.description}</p>
			<div className="flex items-center gap-3 text-xs text-gray-500">
				<FileText size={16} />
				{rig.files} files
			</div>
			<div className="flex gap-2 mt-2 flex-wrap">
				<Button variant="outline" size="sm" className="flex items-center gap-1" asChild>
					<Link href={`/dashboard/rigs/${rig.id}`}>
						<Eye size={15} />
						View
					</Link>
				</Button>
				<Button variant="outline" size="sm" className="flex items-center gap-1" asChild>
					<Link href={`/dashboard/rigs/${rig.id}/edit`}>
						<Edit size={15} />
						Edit
					</Link>
				</Button>
				<Button variant="outline" size="sm" className="flex items-center gap-1" onClick={onDelete}>
					<Trash2 size={15} />
					Delete
				</Button>
			</div>
		</div>
	);
}
