import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { locales } from "./i18n-config";

// Create the intl middleware
const intlMiddleware = createIntlMiddleware({
  locales: locales,
  defaultLocale: "en",
  localePrefix: "always",
});

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const userAgent = req.headers.get("user-agent") || "";

  // Extract locale from pathname
  const pathname = req.nextUrl.pathname;
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Handle i18n routing first
  if (pathnameIsMissingLocale) {
    const locale =
      req.headers.get("accept-language")?.split(",")[0]?.split("-")[0] || "en";
    const localeToUse = locales.includes(locale as any) ? locale : "en";
    const url = req.nextUrl.clone();
    url.pathname = `/${localeToUse}${pathname}`;
    return NextResponse.redirect(url);
  }

  const isBot =
    /googlebot|bingbot|slurp|duckduckbot|baiduspider|yandexbot|facebookexternalhit|twitterbot|rogerbot|linkedinbot|embedly|quora link preview|showyoubot|outbrain|pinterest\/0\.|pinterestbot|slackbot|vkshare|w3c_validator|redditbot|applebot|whatsapp|flipboard|tumblr|bitlybot|skypeuripreview|nuzzel|discordbot|google page speed|qwantify|pinterestbot|bitrix link preview|xing-contenttabreceipts|developers\.google\.com\/\+\/web\/snippet|telegrambot/i.test(
      userAgent
    );

  // Remove locale from pathname for route checking
  const pathnameWithoutLocale = pathname.replace(/^\/[a-z]{2}/, "") || "/";

  const publicRoutes = [
    "/", // Homepage (redirect to home)
    "/about", // About page
    "/snippets", // Snippet listing
    "/tags", // Tags pages
    "/u", // User profiles
  ];

  const unauthenticatedRoutes = [
    "/login",
    "/register",
    "/debug-metadata",
    "/robots.txt",
    "/sitemap.xml",
  ];

  const isAuthPage = pathnameWithoutLocale.startsWith("/login");
  const isAllowedUnauth = unauthenticatedRoutes.includes(pathnameWithoutLocale);

  const isPublicRoute = publicRoutes.some((route) => {
    if (route === "/") {
      return pathnameWithoutLocale === "/";
    }
    return pathnameWithoutLocale.startsWith(route);
  });
  const isPublicSnippet = pathnameWithoutLocale.match(
    /^\/snippets\/[a-zA-Z0-9]+$/
  );
  const isPublicLanguage = pathnameWithoutLocale.match(
    /^\/tags\/language\/[a-zA-Z0-9]+$/
  );
  const isPublicTopic = pathnameWithoutLocale.match(
    /^\/tags\/topic\/[a-zA-Z0-9]+$/
  );
  const isPublicUser = pathnameWithoutLocale.match(/^\/u\/[a-zA-Z0-9]+$/);

  const isPublicPage =
    isPublicRoute ||
    isPublicSnippet ||
    isPublicLanguage ||
    isPublicTopic ||
    isPublicUser;

  // Allow bots to access public pages
  if (isBot && isPublicPage) {
    return intlMiddleware(req);
  }

  // Allow authenticated users to access any page
  if (token) {
    return intlMiddleware(req);
  }

  // Redirect unauthenticated users to login if trying to access protected pages
  if (!token && !isAuthPage && !isAllowedUnauth && !isPublicPage) {
    const locale = pathname.split("/")[1] || "en";
    const url = req.nextUrl.clone();
    url.pathname = `/${locale}/login`;
    return NextResponse.redirect(url);
  }

  if (token && isAuthPage) {
    const locale = pathname.split("/")[1] || "en";
    const url = req.nextUrl.clone();
    url.pathname = `/${locale}/`;
    return NextResponse.redirect(url);
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|apple-touch-icon|robots.txt|sitemap.xml).*)",
  ],
};
