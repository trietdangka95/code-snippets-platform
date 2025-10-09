import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  console.log("token", token);
  const unauthenticatedRoutes = ["/register"];
  const pathname = req.nextUrl.pathname;
  const isAuthPage = pathname.startsWith("/login");
  const isAllowedUnauth = unauthenticatedRoutes.includes(pathname);

  if (!token && !isAuthPage && !isAllowedUnauth) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  if (token && isAuthPage) {
    const url = req.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
