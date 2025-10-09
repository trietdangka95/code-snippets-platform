"use client";
import Link from "next/link";
import Button from "../ui/Button";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [currentUser, setCurrentUser] = useState<{
    id: string;
    name?: string;
  } | null>(null);

  useEffect(() => {
    let active = true;
    const loadMe = async () => {
      try {
        const res = await fetch("/api/auth/me", {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) return;
        if (active) setCurrentUser(data?.user ?? null);
      } catch {
        // ignore
      }
    };
    loadMe();
    return () => {
      active = false;
    };
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
    <header className="w-full bg-white/90 backdrop-blur-md border-b border-gray-200/50 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
              CodeSnippets
            </h1>
            <p className="text-xs text-gray-500 -mt-1">Developer Platform</p>
          </div>
        </Link>

        <nav className="ml-auto">
          <ul className="flex items-center gap-6">
            <li>
              <Link
                href="/"
                className={`text-sm font-medium transition-colors duration-200 relative group ${
                  pathname === "/"
                    ? "text-blue-600"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                Home
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-blue-600 transition-all duration-200 ${
                    pathname === "/" ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                ></span>
              </Link>
            </li>
            {currentUser?.id ? (
              <li>
                <Link
                  href={`/u/${currentUser.id}`}
                  className={`text-sm font-medium transition-colors duration-200 relative group ${
                    pathname === `/u/${currentUser.id}`
                      ? "text-blue-600"
                      : "text-gray-700 hover:text-blue-600"
                  }`}
                >
                  My Profile
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-blue-600 transition-all duration-200 ${
                      pathname === `/u/${currentUser.id}`
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                    }`}
                  ></span>
                </Link>
              </li>
            ) : null}
            <li>
              <Link
                href="/about"
                className={`text-sm font-medium transition-colors duration-200 relative group ${
                  pathname === "/about"
                    ? "text-blue-600"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                About
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-blue-600 transition-all duration-200 ${
                    pathname === "/about" ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                ></span>
              </Link>
            </li>
            <li className="h-8 w-px bg-gray-300"></li>

            {currentUser ? (
              <li className="flex items-center gap-2">
                <p className="text-sm font-medium text-gray-700">
                  Hello {currentUser.name || "User"},
                </p>
                <Button variant="outline" onClick={handleLogout}>
                  Logout
                </Button>
              </li>
            ) : (
              <li>
                <Link
                  href="/login"
                  className={`text-sm font-medium transition-colors duration-200 relative group ${
                    pathname === "/login"
                      ? "text-blue-600"
                      : "text-gray-700 hover:text-blue-600"
                  }`}
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
