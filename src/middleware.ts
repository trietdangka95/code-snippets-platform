/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { locales } from "./i18n-config";

const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale: "en",
  localePrefix: "always",
});

export default function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const userAgent = req.headers.get("user-agent") || "";
  const pathname = req.nextUrl.pathname;

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

  const isBot =
    /bot|crawler|spider|facebookexternalhit|twitterbot|slackbot|discordbot/i.test(
      userAgent
    );

  const pathnameWithoutLocale = pathname.replace(/^\/[a-z]{2}/, "") || "/";
  const isAuthPage = pathnameWithoutLocale.startsWith("/login");
  const unauthRoutes = ["/login", "/register", "/robots.txt", "/sitemap.xml"];
  const publicPrefixes = ["/about", "/tags", "/u"]; // keep public pages only

  const isRootPublic = pathnameWithoutLocale === "/";
  const isPublicPrefix = publicPrefixes.some((route) =>
    pathnameWithoutLocale.startsWith(route)
  );
  const isUnauthRoute = unauthRoutes.some((route) =>
    pathnameWithoutLocale.startsWith(route)
  );
  const isPublic = isRootPublic || isPublicPrefix || isUnauthRoute;

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

  if (!token && !isPublic) {
    const locale = pathname.split("/")[1] || "en";
    const url = req.nextUrl.clone();
    url.pathname = `/${locale}/login`;
    // Lưu URL ban đầu để redirect sau khi login
    url.searchParams.set("returnUrl", pathname);
    return NextResponse.redirect(url);
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
export const runtime = "experimental-edge";
