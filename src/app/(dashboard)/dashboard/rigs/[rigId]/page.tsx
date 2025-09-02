"use client";

import { Server, Lock, Globe, Link2, FileText, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";

// Dummy rig data for demonstration
const rig = {
	id: 1,
	name: "Linux Workstation",
	description: "My personal Linux rig setup.",
	visibility: "private",
	lastUpdated: "2 days ago",
	files: 12,
};

export default function RigViewPage() {
	const [deleteModal, setDeleteModal] = useState(false);

	const visibilityIcon =
		rig.visibility === "private" ? (
			<Lock size={18} className="text-gray-500" />
		) : rig.visibility === "public" ? (
			<Globe size={18} className="text-green-500" />
		) : (
			<Link2 size={18} className="text-blue-500" />
		);

	return (
		<div className="flex-1 flex flex-col min-h-screen">
			<header className="flex items-center justify-between px-4 py-3 sm:px-8 bg-white dark:bg-[#222] backdrop-blur-md shadow-md sticky top-0 z-20">
				<h1 className="text-xl sm:text-2xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
					View Rig
				</h1>
				<div className="flex gap-2">
					<Button variant="outline" size="sm" asChild>
						<Link href={`/dashboard/rigs/${rig.id}/edit`}>
							<Edit size={16} />
							Edit
						</Link>
					</Button>
					<Button
						variant="outline"
						size="sm"
						onClick={() => setDeleteModal(true)}
						className="flex items-center gap-1"
					>
						<Trash2 size={16} />
						Delete
					</Button>
				</div>
			</header>
			<main className="flex-1 flex flex-col items-center justify-start px-2 sm:px-6 py-6 w-full transition-all">
				<section className="w-full max-w-xl mx-auto flex flex-col gap-8">
					<div className="flex flex-col gap-3 bg-white dark:bg-[#222] rounded-xl p-5 shadow">
						<div className="flex items-center gap-2 mb-2">
							<Server size={22} className="text-blue-600 dark:text-blue-400" />
							<span className="font-semibold text-lg">{rig.name}</span>
							{visibilityIcon}
						</div>
						<p className="text-sm text-gray-600 dark:text-gray-400">{rig.description}</p>
						<div className="flex items-center gap-3 text-xs text-gray-500 mt-2">
							<FileText size={16} />
							{rig.files} files
						</div>
						<div className="flex items-center gap-2 mt-4">
							<span className="text-xs text-gray-400">Last updated: {rig.lastUpdated}</span>
						</div>
					</div>
				</section>
			</main>
			{/* Delete Modal */}
			{deleteModal && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
					<div className="bg-white dark:bg-[#222] rounded-xl shadow-lg p-6 w-full max-w-md mx-2">
						<h2 className="text-xl font-bold mb-4 text-center">Delete Rig</h2>
						<p className="text-center text-gray-700 dark:text-gray-300 mb-6">
							Are you sure you want to delete this rig? This action cannot be undone.
						</p>
						<div className="flex gap-2 justify-center">
							<Button variant="ghost" onClick={() => setDeleteModal(false)}>
								Cancel
							</Button>
							<Button
								className="bg-gradient-to-r from-red-600 to-pink-600 text-white"
								onClick={() => {
									// Handle delete logic here
									setDeleteModal(false);
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
