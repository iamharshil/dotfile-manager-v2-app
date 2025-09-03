"use client";

import { LogOut } from "lucide-react";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { redirect } from "next/navigation";

export default function SignOutComponent() {
	const handleLogout = async () => {
		const res = await fetch("/api/auth/logout");
		if (res.ok) {
			return redirect("/auth/signin");
		}
	};

	return (
		<DropdownMenuItem
			className="text-red-600 hover:bg-red-50 dark:hover:bg-red-900 flex items-center gap-2"
			onClick={handleLogout}
		>
			<LogOut size={16} />
			Logout
		</DropdownMenuItem>
	);
}
