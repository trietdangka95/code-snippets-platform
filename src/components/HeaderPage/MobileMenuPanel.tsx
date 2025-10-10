import Link from "next/link";
import LanguageSwitcher from "../LanguageSwitcher";
import { useTranslations, useLocale } from "next-intl";

interface MobileMenuPanelProps {
  isOpen: boolean;
  pathnameWithoutLocale: string;
  currentUser: { id: string; name?: string } | null;
  onClose: () => void;
  onLogout: () => void;
}

const MobileMenuPanel = ({
  isOpen,
  pathnameWithoutLocale,
  currentUser,
  onClose,
  onLogout,
}: MobileMenuPanelProps) => {
  const t = useTranslations("navigation");
  const locale = useLocale();

  if (!isOpen) return null;

  return (
    <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
      <div className="px-4 py-6 space-y-4">
        {/* Navigation Links */}
        <div className="space-y-2">
          <Link
            href={`/${locale}`}
            onClick={onClose}
            className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200 ${
              pathnameWithoutLocale === "/" || pathnameWithoutLocale === "/home"
                ? "text-blue-600 bg-blue-50"
                : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
            }`}
          >
            {t("home")}
          </Link>

          {currentUser?.id && (
            <Link
              href={`/${locale}/user/${currentUser.id}`}
              onClick={onClose}
              className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200 ${
                pathnameWithoutLocale === `/user/${currentUser.id}`
                  ? "text-blue-600 bg-blue-50"
                  : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              }`}
            >
              {t("myProfile")}
            </Link>
          )}

          <Link
            href={`/${locale}/about`}
            onClick={onClose}
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
          <div className="text-sm font-medium text-gray-500 mb-2">Language</div>
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
                onLogout();
                onClose();
              }}
              className="w-full px-4 py-3 text-left text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
            >
              {t("logout")}
            </button>
          </div>
        ) : (
          <div className="border-t border-gray-200 pt-4">
            <Link
              href={`/${locale}/login`}
              onClick={onClose}
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
  );
};

export default MobileMenuPanel;
