import {
	User,
	Settings,
	Server,
	FileText,
	Share2,
	History,
	Users,
	ShieldCheck,
	BarChart2,
	Star,
	CheckCircle2,
	Clock,
	TrendingUp,
	Plus,
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
import Link from "next/link";
import { SidebarTrigger } from "@/components/ui/sidebar";
import SignOutComponent from "@/components/dashboard/signout";
import { getSession } from "@/utils/session";
import database from "@/utils/database";
import UserModel from "@/models/User.model";
import TokenModel from "@/models/Token.model";
import moment from "moment";

// Dummy analytics data
const analytics = {
	accountType: "Pro",
	totalRigs: 5,
	totalFiles: 30,
	totalShares: 8,
	totalHistory: 12,
	lastLogin: "2 hours ago",
	communityShares: 3,
	securityLevel: "High",
	// storageUsed: "120MB", // Commented out as per prompt
	// activityScore: 87, // Commented out as per prompt
	uptime: "99.9%",
	verified: true,
	starredRigs: 2,
	recentUpdates: 4,
	trendingRigs: 1,
};

const UserInfo = async () => {
	const session = await getSession();
	if (!session?.id) return null;

	await database();
	const token = await TokenModel.findOne({ token: session.id });
	const user = await UserModel.findById(token?.userId);

	return { ...user, lastLogin: moment(token?.createdAt).fromNow() };
};

export default async function Dashboard() {
	const user = await UserInfo();
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
								<AvatarImage src={user?.image} alt="User" />
								<AvatarFallback>
									<User size={20} />
								</AvatarFallback>
							</Avatar>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end" className="min-w-[180px]">
						<div className="flex items-center gap-2 px-2 py-1">
							<Avatar className="h-8 w-8">
								<AvatarImage src={user?.image} alt="User" />
								<AvatarFallback>
									<User size={18} />
								</AvatarFallback>
							</Avatar>
							<div>
								<div className="font-medium">{user?.name}</div>
								<div className="text-xs text-gray-500 dark:text-gray-400">{user?.email}</div>
							</div>
						</div>
						<DropdownMenuSeparator />
						<DropdownMenuItem asChild>
							<Link href="/dashboard/settings" className="flex items-center gap-2">
								<Settings size={16} />
								Settings
							</Link>
						</DropdownMenuItem>
						<SignOutComponent />
					</DropdownMenuContent>
				</DropdownMenu>
			</header>

			{/* Main Content */}
			<main className="flex-1 flex flex-col items-center justify-start px-2 sm:px-6 py-6 w-full transition-all">
				<section className="w-full max-w-4xl mx-auto flex flex-col gap-8">
					{/* Overview & Analytics */}
					<div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full">
						<div>
							<h1 className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
								Welcome, {user?.name ?? "User"}!
							</h1>
							<p className="text-base text-gray-700 dark:text-gray-300 mt-1">
								Account Type: <span className="font-bold">{analytics.accountType}</span>
							</p>
							<p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
								Last login: {user?.lastLogin}
							</p>
						</div>
						<Button
							className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold px-5 py-2 rounded-full shadow hover:scale-105 transition"
							asChild
						>
							<Link href="/dashboard/rigs/new">
								<Plus size={18} />
								New Rig
							</Link>
						</Button>
					</div>

					{/* Analytics Cards */}
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
						<AnalyticsCard
							icon={<Server size={28} className="text-blue-600" />}
							title="Total Rigs"
							value={analytics.totalRigs}
							desc="Your environments"
						/>
						<AnalyticsCard
							icon={<FileText size={28} className="text-purple-600" />}
							title="Total Files"
							value={analytics.totalFiles}
							desc="Config files stored"
						/>
						<AnalyticsCard
							icon={<Share2 size={28} className="text-pink-600" />}
							title="Shares"
							value={analytics.totalShares}
							desc="Shared with others"
						/>
						<AnalyticsCard
							icon={<History size={28} className="text-blue-500" />}
							title="Version History"
							value={analytics.totalHistory}
							desc="Restore points"
						/>
					</div>

					{/* More Details */}
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
						{/* <AnalyticsCard
                            icon={<BarChart2 size={24} className="text-blue-400" />}
                            title="Storage Used"
                            value={analytics.storageUsed}
                            desc="Cloud usage"
                        /> */}
						{/* <AnalyticsCard
                            icon={<Activity size={24} className="text-orange-400" />}
                            title="Activity Score"
                            value={analytics.activityScore}
                            desc="Recent activity"
                        /> */}
						<AnalyticsCard
							icon={<Clock size={24} className="text-yellow-500" />}
							title="Uptime"
							value={analytics.uptime}
							desc="Service reliability"
						/>
						<AnalyticsCard
							icon={<CheckCircle2 size={24} className="text-green-500" />}
							title="Verified"
							value={analytics.verified ? "Yes" : "No"}
							desc="Account status"
						/>
						<AnalyticsCard
							icon={<Star size={24} className="text-yellow-400" />}
							title="Starred Rigs"
							value={analytics.starredRigs}
							desc="Your favorites"
						/>
						<AnalyticsCard
							icon={<TrendingUp size={24} className="text-pink-500" />}
							title="Trending Rigs"
							value={analytics.trendingRigs}
							desc="Popular now"
						/>
						<AnalyticsCard
							icon={<ShieldCheck size={24} className="text-green-500" />}
							title="Security"
							value={analytics.securityLevel}
							desc="Account protection"
						/>
						<AnalyticsCard
							icon={<Users size={24} className="text-purple-400" />}
							title="Community Shares"
							value={analytics.communityShares}
							desc="Shared to explore"
						/>
						<AnalyticsCard
							icon={<BarChart2 size={24} className="text-blue-400" />}
							title="Recent Updates"
							value={analytics.recentUpdates}
							desc="Last 7 days"
						/>
					</div>
				</section>
			</main>
		</div>
	);
}

// Analytics card component
function AnalyticsCard({
	icon,
	title,
	value,
	desc,
}: {
	icon: React.ReactNode;
	title: string;
	value: string | number;
	desc: string;
}) {
	return (
		<div className="flex flex-col items-start gap-2 bg-white dark:bg-[#222] rounded-xl p-5 shadow hover:scale-[1.02] transition-all">
			<div className="flex items-center gap-2 mb-1">{icon}</div>
			<div className="font-semibold text-lg">{title}</div>
			<div className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
				{value}
			</div>
			<div className="text-xs text-gray-500 dark:text-gray-400">{desc}</div>
		</div>
	);
}
