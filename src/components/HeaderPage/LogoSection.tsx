import Link from "next/link";
import { CodeIcon } from "@/components/Icons";
import { useLocale } from "next-intl";

const LogoSection = () => {
  const locale = useLocale();

  return (
    <div className="flex-shrink-0">
      <Link href={`/${locale}`} className="flex items-center gap-3 group">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
          <CodeIcon className="w-6 h-6 text-white" />
        </div>
        <div className="hidden sm:block">
          <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
            CodeSnippets
          </h1>
          <p className="text-xs text-gray-500 -mt-1">Developer Platform</p>
        </div>
      </Link>
    </div>
  );
};

export default LogoSection;
