import Link from "next/link";
import Button from "../ui/Button";
import { useTranslations, useLocale } from "next-intl";

interface UserSectionProps {
  currentUser: { id: string; name?: string } | null;
  pathnameWithoutLocale: string;
  onLogout: () => void;
}

const UserSection = ({
  currentUser,
  pathnameWithoutLocale,
  onLogout,
}: UserSectionProps) => {
  const t = useTranslations("navigation");
  const locale = useLocale();

  if (currentUser) {
    return (
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
          onClick={onLogout}
          className="px-3 py-1.5 text-sm border-gray-300 hover:border-red-300 hover:text-red-600 hover:bg-red-50 transition-all duration-200"
        >
          {t("logout")}
        </Button>
      </div>
    );
  }

  return (
    <Link
      href={`/${locale}/login`}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
        pathnameWithoutLocale === "/login"
          ? "text-blue-600 bg-blue-50"
          : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
      }`}
    >
      {t("login")}
    </Link>
  );
};

export default UserSection;
