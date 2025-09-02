import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Compass, Home, Server, Share2, SlidersHorizontal } from "lucide-react";
import { Separator } from "../ui/separator";

// Updated menu items for dotfile manager
const items = [
	{
		title: "Dashboard",
		url: "/dashboard",
		icon: Home,
	},
	{
		title: "Rigs",
		url: "/dashboard/rigs",
		icon: Server,
	},
	{
		title: "Explore",
		url: "/dashboard/explore",
		icon: Compass,
	},
	{
		title: "Share",
		url: "/dashboard/share",
		icon: Share2,
	},
	{
		title: "Settings",
		url: "/settings",
		icon: SlidersHorizontal,
	},
];

export function AppSidebar() {
	return (
		<Sidebar className="bg-white dark:bg-[#222] shadow-lg border-r border-gray-100 dark:border-gray-800 min-h-screen">
			<SidebarContent>
				<SidebarGroup className="flex flex-col justify-between h-full">
					<div>
						<SidebarGroupLabel className="flex flex-col items-center justify-center py-6">
							<span className="block text-2xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent tracking-tight">
								Dotfile Manager
							</span>
						</SidebarGroupLabel>
						<Separator className="my-3 mt-2" />
						<SidebarGroupContent>
							<SidebarMenu>
								{items.map((item) => (
									<SidebarMenuItem key={item.title} className="mb-1">
										<SidebarMenuButton asChild>
											<a
												href={item.url}
												className="flex items-center gap-3 px-4 py-2 rounded-xl font-semibold text-gray-700 dark:text-gray-200 hover:bg-blue-600/10 dark:hover:bg-blue-600/20 transition-colors text-base group"
											>
												<item.icon
													size={22}
													className="dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors"
												/>
												<span className="">{item.title}</span>
											</a>
										</SidebarMenuButton>
									</SidebarMenuItem>
								))}
							</SidebarMenu>
						</SidebarGroupContent>
					</div>
					<SidebarFooter>
						<div className="px-4 py-3">
							<a
								href="/dashboard/new-rig"
								className="w-full inline-block text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-2 px-4 rounded-full hover:from-blue-700 hover:to-purple-700 transition-colors shadow"
							>
								+ New Rig
							</a>
						</div>
					</SidebarFooter>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	);
}
