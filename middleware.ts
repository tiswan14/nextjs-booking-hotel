import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

const ProtectedRoute = ["/reservasi", "/checkout", "/admin"];

export async function middleware(request: NextRequest) {
    const session = await auth();
    const isLoggedIn = !!session?.user
    const role = session?.user?.role
    const { pathname } = request.nextUrl

    if (!isLoggedIn && ProtectedRoute.some((route) => pathname.startsWith(route))) {
        return NextResponse.redirect(new URL("/register", request.url))
    }

    if (isLoggedIn && role !== "admin" && pathname.startsWith("/admin")) {
        return NextResponse.redirect(new URL("/", request.url))
    }

    if (isLoggedIn && pathname === "/register") {
        return NextResponse.redirect(new URL("/", request.url))
    }
}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico).*)", // semua kecuali folder tertentu
        "/((?!.*\\.).*)",         // semua URL yang tidak memiliki titik (.) → artinya exclude file seperti .js, .png
    ]
};
