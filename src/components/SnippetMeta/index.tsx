"use client";
import Link from "next/link";
import LanguageColor from "@/components/LanguageColor";
import UITag from "@/components/UITag";
import { analyzeComplexity } from "@/lib/complexity";
import { useTranslations, useLocale } from "next-intl";

type LanguageRef = { id: string; name: string } | null | undefined;
type TopicEdge = { topic: { id: string; name: string } }[] | undefined;
type UserRef = { id: string; name: string | null } | null | undefined;

const SnippetMeta = ({
  title,
  language,
  topics,
  user,
  code,
  previewLength = 240,
  isLanguagePage = false,
  isUserProfilePage = false,
}: {
  title?: string;
  language?: LanguageRef;
  topics?: TopicEdge;
  user?: UserRef;
  code?: string;
  previewLength?: number;
  isLanguagePage?: boolean;
  isUserProfilePage?: boolean;
}) => {
  const t = useTranslations("snippets");
  const locale = useLocale();
  return (
    <div className="flex flex-col gap-2 w-full max-w-7xl mx-auto px-6 py-8 rounded-2xl p-8 bg-gradient-to-br from-white via-gray-50 to-blue-50 shadow-xl border border-gray-200/50 backdrop-blur-sm">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent">
        {title}
      </h1>
      {!isUserProfilePage && (
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <p>{t("createdBy")}:</p>
            <Link
              href={`/${locale}/user/${user?.id ?? ""}`}
              className="hover:underline text-blue-700"
            >
              {user?.name || "Unknown"}
            </Link>
          </div>
        </div>
      )}
      {!isLanguagePage && (
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <p>{t("programmingLanguage")}:</p>
          <Link
            href={`/${locale}/tags/language/${language?.id ?? ""}`}
            className="hover:underline"
          >
            <LanguageColor language={language?.name || "Unknown"} />
          </Link>
        </div>
      )}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
        <p>{t("topics")}:</p>
        <div className="flex flex-wrap gap-2">
          {(topics ?? []).length === 0 ? (
            <UITag>—</UITag>
          ) : (
            (topics ?? []).map((t) => (
              <Link
                key={t.topic.id}
                href={`/${locale}/tags/topic/${t.topic.id}`}
                className="hover:underline"
              >
                <UITag>{t.topic.name}</UITag>
              </Link>
            ))
          )}
        </div>
      </div>
      {typeof code === "string" ? (
        <div className="bg-gray-100 rounded-xl p-4 font-mono text-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-500">{t("codePreview")}</span>
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-semibold">
                {t("complexity")}: {analyzeComplexity(code)}
              </span>
            </div>
          </div>
          <pre className="whitespace-pre-wrap break-words text-gray-800">
            {code.slice(0, previewLength)}
            {code.length > previewLength ? "\n..." : ""}
          </pre>
        </div>
      ) : null}
    </div>
  );
};

export default SnippetMeta;
