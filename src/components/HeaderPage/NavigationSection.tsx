import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

interface NavigationSectionProps {
  pathnameWithoutLocale: string;
  currentUser: { id: string; name?: string } | null;
}

const NavigationSection = ({
  pathnameWithoutLocale,
  currentUser,
}: NavigationSectionProps) => {
  const t = useTranslations("navigation");
  const locale = useLocale();

  return (
    <nav className="hidden md:flex items-center space-x-1">
      <Link
        href={`/${locale}`}
        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative group ${
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
          className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative group ${
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
        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative group ${
          pathnameWithoutLocale === "/about"
            ? "text-blue-600 bg-blue-50"
            : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
        }`}
      >
        {t("about")}
      </Link>
    </nav>
  );
};

export default NavigationSection;
