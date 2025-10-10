"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useUser } from "@/contexts/UserContext";
import { useLocale } from "next-intl";
import LanguageSwitcher from "../LanguageSwitcher";
import LogoSection from "./LogoSection";
import NavigationSection from "./NavigationSection";
import UserSection from "./UserSection";
import MobileMenuButton from "./MobileMenuButton";
import MobileMenuPanel from "./MobileMenuPanel";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user: currentUser, refetch } = useUser();
  const locale = useLocale();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const pathnameWithoutLocale = pathname.replace(/^\/[a-z]{2}/, "") || "/";

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
      // Refetch user data to update the context
      await refetch();
      router.push(`/${locale}/login`);
    }
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMobileMenuClose = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="w-full bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          {/* Logo Section */}
          <LogoSection />

          {/* Navigation Section */}
          <NavigationSection
            pathnameWithoutLocale={pathnameWithoutLocale}
            currentUser={currentUser}
          />

          {/* Right Section */}
          <div className="flex items-center space-x-3">
            {/* Language Switcher */}
            <div className="hidden sm:block">
              <LanguageSwitcher />
            </div>

            {/* User Section */}
            <UserSection
              currentUser={currentUser}
              pathnameWithoutLocale={pathnameWithoutLocale}
              onLogout={handleLogout}
            />

            {/* Mobile Menu Button */}
            <MobileMenuButton
              isOpen={isMobileMenuOpen}
              onToggle={handleMobileMenuToggle}
            />
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <MobileMenuPanel
        isOpen={isMobileMenuOpen}
        pathnameWithoutLocale={pathnameWithoutLocale}
        currentUser={currentUser}
        onClose={handleMobileMenuClose}
        onLogout={handleLogout}
      />
    </header>
  );
};

export default Header;
