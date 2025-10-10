"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useToast } from "@/hooks/useToast";
import LanguageColor from "../LanguageColor";
import UITag from "../UITag";
import { InlineSpinner } from "../ui/Loading";
import Button from "../ui/Button";
import { analyzeComplexity } from "@/lib/complexity";
import { TrashIcon, CopyIcon, EyeIcon } from "@/components/Icons";
import { useTranslations } from "next-intl";
import { useUser } from "@/contexts/UserContext";

type ApiSnippet = {
  id: string;
  title: string;
  code: string;
  language?: { id: string; name: string } | null;
  topics?: { topic: { id: string; name: string } }[];
  createdAt: string;
  user?: { id: string; name: string | null } | null;
};

const CodeSnippetsPage = ({ refreshToken }: { refreshToken?: number }) => {
  const t = useTranslations("snippets");
  const { user } = useUser();
  const [snippets, setSnippets] = useState<ApiSnippet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  // Search removed

  useEffect(() => {
    let active = true;
    const run = async () => {
      try {
        const params = new URLSearchParams();
        const res = await fetch(
          `/api/snippets${params.toString() ? `?${params.toString()}` : ""}`,
          { credentials: "include" }
        );
        const data = await res.json();
        if (active) setSnippets(data.snippets || []);
      } finally {
        if (active) setLoading(false);
      }
    };
    run();
    return () => {
      active = false;
    };
  }, [refreshToken]);

  const { success, error } = useToast();

  const handleCopy = async (id: string) => {
    try {
      const origin =
        typeof window !== "undefined" ? window.location.origin : "";
      const url = `${origin}/snippets/${id}`;
      await navigator.clipboard.writeText(url);
      success("Copied snippet link");
    } catch {
      error("Copy failed");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/snippets/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok && data?.ok) {
        setSnippets((prev) => prev.filter((s) => s.id !== id));
        success("Deleted snippet");
      } else {
        error(data?.error || "Delete failed");
      }
    } catch {
      error("Delete failed");
    }
  };

  const handleConfirmDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this snippet?")) {
      handleDelete(id);
    }
  };

  return (
    <section className="rounded-2xl p-8 bg-gradient-to-br from-white via-gray-50 to-blue-50 shadow-xl border border-gray-200/50 backdrop-blur-sm">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent mb-2">
              {t("title")}
            </h2>
            <p className="text-gray-700 text-sm">{t("subtitle")}</p>
          </div>
        </div>
      </div>

      {/* Search removed by request */}

      <ul className="space-y-6">
        {loading ? (
          <li className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6 shadow-lg flex items-center justify-center">
            <InlineSpinner message={"loading"} />
          </li>
        ) : snippets.length === 0 ? (
          <li className="text-center text-sm text-gray-500">
            {t("noSnippets")}
          </li>
        ) : (
          snippets.map((snip) => (
            <li
              key={snip.id}
              className="group bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-200 "
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">
                    {snip.title || t("untitled")}
                  </h3>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                <p>{t("createdBy")}:</p>
                <Link
                  href={`/user/${snip.user?.id ?? ""}`}
                  className="hover:underline text-blue-700"
                >
                  {snip.user?.name || t("unknown")}
                </Link>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                <p>{t("programmingLanguage")}:</p>
                <Link
                  href={`/tags/language/${snip.language?.id ?? ""}`}
                  className="hover:underline"
                >
                  <LanguageColor
                    language={snip.language?.name || t("unknown")}
                  />
                </Link>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                <p>{t("topics")}:</p>
                <div className="flex flex-wrap gap-2">
                  {(snip.topics || []).length === 0 ? (
                    <UITag>—</UITag>
                  ) : (
                    (snip.topics || []).map((t) => (
                      <Link
                        key={t.topic.id}
                        href={`/tags/topic/${t.topic.id}`}
                        className="hover:underline"
                      >
                        <UITag>{t.topic.name}</UITag>
                      </Link>
                    ))
                  )}
                </div>
              </div>

              <div className="bg-gray-100 rounded-xl p-4 mb-4 font-mono text-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-500">
                    {t("codePreview")}
                  </span>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-semibold">
                      {t("complexity")}: {analyzeComplexity(snip.code)}
                    </span>
                  </div>
                </div>
                <div className="space-y-1">
                  <pre className="whitespace-pre-wrap break-words text-gray-800">
                    {snip.code?.slice(0, 240)}
                    {snip.code && snip.code.length > 240 ? "\n..." : ""}
                  </pre>
                </div>
              </div>

              <div className="flex sm:justify-end">
                <div className="flex w-full sm:w-auto flex-col sm:flex-row gap-2">
                  <Link
                    href={`/snippets/${snip.id}`}
                    className="inline-flex items-center justify-center gap-1 px-3 py-2 sm:px-4 sm:py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm font-medium w-full sm:w-auto"
                  >
                    <EyeIcon className="w-4 h-4" />
                    <span>{t("view")}</span>
                  </Link>
                  <Button
                    type="button"
                    className="inline-flex items-center justify-center gap-1 px-3 py-2 sm:px-4 sm:py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium w-full sm:w-auto"
                    onClick={() => handleCopy(snip.id)}
                  >
                    <CopyIcon className="w-4 h-4" />
                    <span>{t("copyLink")}</span>
                  </Button>
                  <Button
                    type="button"
                    className="inline-flex items-center justify-center gap-1 px-3 py-2 sm:px-4 sm:py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium w-full sm:w-auto"
                    disabled={snip.user?.id !== user?.id}
                    onClick={() => {
                      if (snip.user?.id !== user?.id) return;
                      handleConfirmDelete(snip.id);
                    }}
                  >
                    <TrashIcon className="w-4 h-4" />
                    <span>{t("delete")}</span>
                  </Button>
                </div>
              </div>
            </li>
          ))
        )}
      </ul>
    </section>
  );
};

export default CodeSnippetsPage;
