// create nextjs app router (typescript) middleware and run it if url matches to /dashboard or any subpath of it.
// skip img and other static files
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { destroySession, getSession } from "./utils/session";

export async function middleware(request: NextRequest) {
	const session = await getSession();
	if (!session?.id) {
		await destroySession();
		const url = request.nextUrl.clone();
		url.pathname = "/auth/signin";
		return NextResponse.redirect(url);
	}
	return NextResponse.next();
}

export const config = {
	matcher: ["/dashboard/:path*", "/api/v1/:path*"],
};
