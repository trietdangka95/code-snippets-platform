"use client";
import Link from "next/link";
import Button from "../ui/Button";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "../LanguageSwitcher";
import { CodeIcon, CloseIcon, MenuIcon } from "@/components/Icons";
import { useUser } from "@/contexts/UserContext";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("navigation");
  const { user: currentUser } = useUser();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Remove locale prefix from pathname for comparison
  const pathnameWithoutLocale = pathname.replace(/^\/[a-z]{2}/, "") || "/";

  // Close mobile menu when screen size changes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = async () => {
    const res = await fetch("/api/auth/logout", {
      method: "POST",
    });
    if (res.ok) {
      router.push("/login");
    }
  };
  return (
    <header className="w-full bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                <CodeIcon className="w-6 h-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                  CodeSnippets
                </h1>
                <p className="text-xs text-gray-500 -mt-1">
                  Developer Platform
                </p>
              </div>
            </Link>
          </div>

          {/* Navigation Section */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link
              href="/"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative group ${
                pathnameWithoutLocale === "/" ||
                pathnameWithoutLocale === "/home"
                  ? "text-blue-600 bg-blue-50"
                  : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              }`}
            >
              {t("home")}
            </Link>

            {currentUser?.id && (
              <Link
                href={`/u/${currentUser.id}`}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative group ${
                  pathnameWithoutLocale === `/u/${currentUser.id}`
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                }`}
              >
                {t("myProfile")}
              </Link>
            )}

            <Link
              href="/about"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative group ${
                pathnameWithoutLocale === "/about"
                  ? "text-blue-600 bg-blue-50"
                  : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              }`}
            >
              {t("about")}
            </Link>
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-3">
            {/* Language Switcher */}
            <div className="hidden sm:block">
              <LanguageSwitcher />
            </div>

            {/* User Section */}
            {currentUser ? (
              <div className="flex items-center space-x-3">
                <div className="hidden sm:flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {currentUser.name?.charAt(0)?.toUpperCase() || "U"}
                    </span>
                  </div>
                  <div className="text-sm">
                    <p className="font-medium text-gray-900">
                      {currentUser.name || t("user")}
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  onClick={handleLogout}
                  className="px-3 py-1.5 text-sm border-gray-300 hover:border-red-300 hover:text-red-600 hover:bg-red-50 transition-all duration-200"
                >
                  {t("logout")}
                </Button>
              </div>
            ) : (
              <Link
                href="/login"
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  pathnameWithoutLocale === "/login"
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                }`}
              >
                {t("login")}
              </Link>
            )}

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200"
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {isMobileMenuOpen ? (
                  <CloseIcon className="w-5 h-5" />
                ) : (
                  <MenuIcon className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="px-4 py-6 space-y-4">
            {/* Navigation Links */}
            <div className="space-y-2">
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200 ${
                  pathnameWithoutLocale === "/" ||
                  pathnameWithoutLocale === "/home"
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                }`}
              >
                {t("home")}
              </Link>

              {currentUser?.id && (
                <Link
                  href={`/u/${currentUser.id}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200 ${
                    pathnameWithoutLocale === `/u/${currentUser.id}`
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  }`}
                >
                  {t("myProfile")}
                </Link>
              )}

              <Link
                href="/about"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200 ${
                  pathnameWithoutLocale === "/about"
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                }`}
              >
                {t("about")}
              </Link>
            </div>

            {/* Language Switcher */}
            <div className="px-4 py-3">
              <div className="text-sm font-medium text-gray-500 mb-2">
                Language
              </div>
              <LanguageSwitcher />
            </div>

            {/* User Section */}
            {currentUser ? (
              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center px-4 py-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-medium">
                      {currentUser.name?.charAt(0)?.toUpperCase() || "U"}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {currentUser.name || t("user")}
                    </p>
                    <p className="text-sm text-gray-500">{t("hello")}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full px-4 py-3 text-left text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                >
                  {t("logout")}
                </button>
              </div>
            ) : (
              <div className="border-t border-gray-200 pt-4">
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200 ${
                    pathnameWithoutLocale === "/login"
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  }`}
                >
                  {t("login")}
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
