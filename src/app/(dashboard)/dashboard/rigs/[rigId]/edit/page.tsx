"use client";

import { Server, Lock, Globe, Link2, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";

// Dummy rig data for demonstration
const rig = {
	id: 1,
	name: "Linux Workstation",
	description: "My personal Linux rig setup.",
	visibility: "private",
	files: 12,
};

export default function EditRigPage() {
	const [name, setName] = useState(rig.name);
	const [description, setDescription] = useState(rig.description);
	const [visibility, setVisibility] = useState(rig.visibility);

	return (
		<div className="flex-1 flex flex-col min-h-screen">
			<header className="flex items-center justify-between px-4 py-3 sm:px-8 bg-white dark:bg-[#222] backdrop-blur-md shadow-md sticky top-0 z-20">
				<h1 className="text-xl sm:text-2xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
					Edit Rig
				</h1>
				<Button variant="outline" size="sm" asChild>
					<Link href={`/dashboard/rigs/${rig.id}`}>Back</Link>
				</Button>
			</header>
			<main className="flex-1 flex flex-col items-center justify-start px-2 sm:px-6 py-6 w-full transition-all">
				<section className="w-full max-w-xl mx-auto flex flex-col gap-8">
					<form className="flex flex-col gap-5 bg-white dark:bg-[#222] rounded-xl p-5 shadow">
						<div className="flex items-center gap-2 mb-2">
							<Server size={22} className="text-blue-600 dark:text-blue-400" />
							<span className="font-semibold text-lg">Rig Details</span>
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
								placeholder="Rig name"
							/>
						</div>
						<div>
							<label
								htmlFor="description"
								className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
							>
								Description
							</label>
							<Input
								id="description"
								type="text"
								value={description}
								onChange={(e) => setDescription(e.target.value)}
								required
								className="w-full"
								placeholder="Rig description"
							/>
						</div>
						<div>
							<span className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
								Visibility
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
						<div className="flex items-center gap-3 text-xs text-gray-500 mt-2">
							<FileText size={16} />
							{rig.files} files
						</div>
						<div className="flex gap-2 justify-end mt-4">
							<Button type="button" variant="ghost" asChild>
								<Link href={`/dashboard/rigs/${rig.id}`}>Cancel</Link>
							</Button>
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
