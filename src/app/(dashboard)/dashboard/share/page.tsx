"use client";

import { Share2, Link2, Server, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";

// Dummy rigs to share
const myRigs = [
	{
		id: 1,
		name: "Linux Workstation",
		files: 12,
		shareLink: "https://dotfile.app/share/1",
	},
	{
		id: 2,
		name: "MacBook Pro",
		files: 8,
		shareLink: "https://dotfile.app/share/2",
	},
];

export default function SharePage() {
	const [copiedId, setCopiedId] = useState<number | null>(null);

	const handleCopy = (link: string, id: number) => {
		navigator.clipboard.writeText(link);
		setCopiedId(id);
		setTimeout(() => setCopiedId(null), 1500);
	};

	return (
		<div className="flex-1 flex flex-col min-h-screen">
			<header className="flex items-center justify-between px-4 py-3 sm:px-8 bg-white dark:bg-[#222] backdrop-blur-md shadow-md sticky top-0 z-20">
				<h1 className="text-xl sm:text-2xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
					Share Your Rigs
				</h1>
			</header>
			<main className="flex-1 flex flex-col items-center justify-start px-2 sm:px-6 py-6 w-full transition-all">
				<section className="w-full max-w-2xl mx-auto flex flex-col gap-8">
					<div className="grid grid-cols-1 gap-6 w-full">
						{myRigs.length === 0 ? (
							<div className="col-span-full text-center text-gray-500 dark:text-gray-400 py-8">
								No rigs available to share.
							</div>
						) : (
							myRigs.map((rig) => (
								<div
									key={rig.id}
									className="flex flex-col gap-3 bg-white dark:bg-[#222] rounded-xl p-5 shadow"
								>
									<div className="flex items-center gap-2">
										<Server size={20} className="text-blue-600 dark:text-blue-400" />
										<span className="font-semibold text-lg">{rig.name}</span>
									</div>
									<div className="flex items-center gap-3 text-xs text-gray-500">
										<FileText size={16} />
										{rig.files} files
									</div>
									<div className="flex gap-2 mt-2 flex-wrap">
										<Button
											variant="outline"
											size="sm"
											className="flex items-center gap-1"
											onClick={() => handleCopy(rig.shareLink, rig.id)}
										>
											<Link2 size={15} />
											{copiedId === rig.id ? "Copied!" : "Copy Share Link"}
										</Button>
										<Button variant="outline" size="sm" asChild>
											<Link href={rig.shareLink} target="_blank">
												<Share2 size={15} />
												Open Link
											</Link>
										</Button>
									</div>
								</div>
							))
						)}
					</div>
				</section>
			</main>
		</div>
	);
}
