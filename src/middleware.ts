/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { locales } from "./i18n-config";

// Tạo middleware xử lý ngôn ngữ
const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale: "en",
  localePrefix: "always",
});

export default function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const userAgent = req.headers.get("user-agent") || "";
  const pathname = req.nextUrl.pathname;

  // ✅ Check nếu path chưa có locale prefix (ví dụ `/login` → `/en/login`)
  const missingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (missingLocale) {
    const preferredLocale =
      req.headers.get("accept-language")?.split(",")[0]?.split("-")[0] || "en";
    const localeToUse = locales.includes(preferredLocale as any)
      ? preferredLocale
      : "en";
    const url = req.nextUrl.clone();
    url.pathname = `/${localeToUse}${pathname}`;
    return NextResponse.redirect(url);
  }

  // ✅ Bot detection
  const isBot =
    /bot|crawler|spider|facebookexternalhit|twitterbot|slackbot|discordbot/i.test(
      userAgent
    );

  // ✅ Auth check
  const pathnameWithoutLocale = pathname.replace(/^\/[a-z]{2}/, "") || "/";
  const isAuthPage = pathnameWithoutLocale.startsWith("/login");
  const unauthRoutes = ["/login", "/register", "/robots.txt", "/sitemap.xml"];
  // Do NOT include "/" here; handle it as exact match to avoid matching everything
  const publicPrefixes = ["/about", "/tags", "/u"]; // keep public pages only

  const isRootPublic = pathnameWithoutLocale === "/";
  const isPublicPrefix = publicPrefixes.some((route) =>
    pathnameWithoutLocale.startsWith(route)
  );
  const isUnauthRoute = unauthRoutes.some((route) =>
    pathnameWithoutLocale.startsWith(route)
  );
  const isPublic = isRootPublic || isPublicPrefix || isUnauthRoute;

  // ✅ Bot được phép crawl public
  if (isBot && isPublic) return intlMiddleware(req);

  // ✅ User có token → cho qua
  if (token) {
    if (isAuthPage) {
      const locale = pathname.split("/")[1] || "en";
      const url = req.nextUrl.clone();
      url.pathname = `/${locale}/`;
      return NextResponse.redirect(url);
    }
    return intlMiddleware(req);
  }

  // ✅ User chưa login mà vào private route → redirect
  if (!token && !isPublic) {
    const locale = pathname.split("/")[1] || "en";
    const url = req.nextUrl.clone();
    url.pathname = `/${locale}/login`;
    return NextResponse.redirect(url);
  }

  // ✅ Trường hợp còn lại (public, bot, etc.)
  return intlMiddleware(req);
}

// ✅ Matcher chuẩn
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
export const runtime = "experimental-edge";
