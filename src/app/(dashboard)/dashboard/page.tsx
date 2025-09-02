"use client";

import {
	Menu,
	User,
	Settings,
	LogOut,
	LayoutDashboard,
	Server,
	Compass,
	Share2,
	SlidersHorizontal,
	Lock,
	Globe,
	FileText,
	Edit,
	Trash2,
	Link2,
	Eye,
	Plus,
	Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";

// Dummy data for demonstration
const projects = [
	{
		id: 1,
		name: "Dotfiles Linux",
		description: "My personal Linux setup configs.",
		visibility: "private",
		lastUpdated: "2 days ago",
		files: 12,
	},
	{
		id: 2,
		name: "MacOS Essentials",
		description: "Configs for MacOS development.",
		visibility: "public",
		lastUpdated: "5 hours ago",
		files: 8,
	},
	{
		id: 3,
		name: "WSL Setup",
		description: "WSL dotfiles and scripts.",
		visibility: "private",
		lastUpdated: "1 week ago",
		files: 5,
	},
	{
		id: 4,
		name: "Neovim Config",
		description: "My Neovim plugins and settings.",
		visibility: "public",
		lastUpdated: "3 days ago",
		files: 3,
	},
	{
		id: 5,
		name: "Zsh Theme",
		description: "Custom Zsh prompt and aliases.",
		visibility: "unlisted",
		lastUpdated: "4 hours ago",
		files: 2,
	},
];

export default function Dashboard() {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [search, setSearch] = useState("");
	const [showModal, setShowModal] = useState(false);

	const filteredProjects = projects.filter(
		(p) =>
			p.name.toLowerCase().includes(search.toLowerCase()) ||
			p.description.toLowerCase().includes(search.toLowerCase())
	);

	return (
		<div className="flex-1 flex flex-col min-h-screen">
			{/* Header */}
			<header className="flex items-center justify-between px-4 py-3 sm:px-8 bg-white dark:bg-[#222] backdrop-blur-md shadow-md sticky top-0 z-20">
				<div className="flex items-center gap-2">
					<SidebarTrigger />
					<span className="block sm:hidden text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
						Dotfile Manager
					</span>
				</div>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" size="icon" className="rounded-full">
							<Avatar>
								<AvatarImage src="/avatar.png" alt="User" />
								<AvatarFallback>
									<User size={20} />
								</AvatarFallback>
							</Avatar>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end" className="min-w-[180px]">
						<div className="flex items-center gap-2 px-2 py-1">
							<Avatar className="h-8 w-8">
								<AvatarImage src="/avatar.png" alt="User" />
								<AvatarFallback>
									<User size={18} />
								</AvatarFallback>
							</Avatar>
							<div>
								<div className="font-medium">Harshil</div>
								<div className="text-xs text-gray-500 dark:text-gray-400">harshil@email.com</div>
							</div>
						</div>
						<DropdownMenuSeparator />
						<DropdownMenuItem asChild>
							<Link href="/settings" className="flex items-center gap-2">
								<Settings size={16} />
								Settings
							</Link>
						</DropdownMenuItem>
						<DropdownMenuItem className="text-red-600 hover:bg-red-50 dark:hover:bg-red-900 flex items-center gap-2">
							<LogOut size={16} />
							Logout
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</header>

			{/* Main Content */}
			<main className="flex-1 flex flex-col items-center justify-start px-2 sm:px-6 py-6 w-full transition-all">
				<section className="w-full max-w-3xl mx-auto flex flex-col gap-8">
					{/* Overview */}
					<div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full">
						<div>
							<h1 className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
								Welcome, Harshil!
							</h1>
							<p className="text-base text-gray-700 dark:text-gray-300 mt-1">
								You have <span className="font-bold">{projects.length} projects</span>
							</p>
						</div>
						<Button
							className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold px-5 py-2 rounded-full shadow hover:scale-105 transition"
							onClick={() => setShowModal(true)}
						>
							<Plus size={18} />
							New Project
						</Button>
					</div>

					{/* Search Bar */}
					<div className="flex items-center gap-2 w-full">
						<div className="relative w-full">
							<Input
								placeholder="Search your projects..."
								value={search}
								onChange={(e) => setSearch(e.target.value)}
								className="pl-10 pr-4 py-2 rounded-lg bg-white dark:bg-[#222] shadow"
							/>
							<Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
						</div>
					</div>

					{/* My Projects Section */}
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
						{filteredProjects.length === 0 ? (
							<div className="col-span-full text-center text-gray-500 dark:text-gray-400 py-8">
								No projects found.
							</div>
						) : (
							filteredProjects.map((project) => <ProjectCard key={project.id} project={project} />)
						)}
					</div>
				</section>
			</main>

			{/* Modal for New Project */}
			{showModal && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
					<div className="bg-white dark:bg-[#222] rounded-xl shadow-lg p-6 w-full max-w-md mx-2">
						<h2 className="text-xl font-bold mb-4">Create New Project</h2>
						<form
							className="flex flex-col gap-4"
							onSubmit={(e) => {
								e.preventDefault();
								setShowModal(false);
							}}
						>
							<Input placeholder="Project Name" required />
							<Input placeholder="Description" required />
							<div className="flex gap-2 items-center">
								<span className="font-medium">Visibility:</span>
								<Button type="button" variant="outline" size="sm">
									<Lock size={16} className="mr-1" />
									Private
								</Button>
								<Button type="button" variant="outline" size="sm">
									<Globe size={16} className="mr-1" />
									Public
								</Button>
								<Button type="button" variant="outline" size="sm">
									<Link2 size={16} className="mr-1" />
									Unlisted
								</Button>
							</div>
							<div className="flex gap-2 justify-end mt-2">
								<Button type="button" variant="ghost" onClick={() => setShowModal(false)}>
									Cancel
								</Button>
								<Button
									type="submit"
									className="bg-gradient-to-r from-blue-600 to-purple-600 text-white"
								>
									Create
								</Button>
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	);
}

// Sidebar link component
function SidebarLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
	return (
		<Link
			href={href}
			className="flex items-center gap-3 px-3 py-2 rounded-lg font-medium text-gray-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors text-base"
		>
			{icon}
			<span>{label}</span>
		</Link>
	);
}

// Project card component
function ProjectCard({ project }: { project: any }) {
	const visibilityIcon =
		project.visibility === "private" ? (
			<Lock size={18} className="text-gray-500" />
		) : project.visibility === "public" ? (
			<Globe size={18} className="text-green-500" />
		) : (
			<Link2 size={18} className="text-blue-500" />
		);

	return (
		<div className="flex flex-col gap-3 bg-white dark:bg-[#222] rounded-xl p-5 shadow hover:scale-[1.02] transition-all">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<span className="font-semibold text-lg">{project.name}</span>
					{visibilityIcon}
				</div>
				<span className="text-xs text-gray-400">{project.lastUpdated}</span>
			</div>
			<p className="text-sm text-gray-600 dark:text-gray-400">{project.description}</p>
			<div className="flex items-center gap-3 text-xs text-gray-500">
				<FileText size={16} />
				{project.files} files
			</div>
			<div className="flex gap-2 mt-2 flex-wrap">
				<Button variant="outline" size="sm" className="flex items-center gap-1">
					<Eye size={15} />
					View Files
				</Button>
				<Button variant="outline" size="sm" className="flex items-center gap-1">
					<Edit size={15} />
					Edit
				</Button>
				<Button variant="outline" size="sm" className="flex items-center gap-1">
					<Trash2 size={15} />
					Delete
				</Button>
				<Button variant="outline" size="sm" className="flex items-center gap-1">
					{project.visibility === "private" ? <Link2 size={15} /> : <Globe size={15} />}
					{project.visibility === "private" ? "Share Link" : "Toggle Visibility"}
				</Button>
			</div>
		</div>
	);
}
