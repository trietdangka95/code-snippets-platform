"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useToast } from "@/hooks/useToast";
import LanguageColor from "../LanguageColor";
import UITag from "../UITag";
import { InlineSpinner } from "../ui/Loading";
import Button from "../ui/Button";
import { analyzeComplexity } from "@/lib/complexity";

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
              Code Snippets
            </h2>
            <p className="text-gray-600 text-sm">
              Discover and explore code snippets from the community
            </p>
          </div>
        </div>
      </div>

      {/* Search removed by request */}

      <ul className="space-y-6">
        {loading ? (
          <li className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6 shadow-lg flex items-center justify-center">
            <InlineSpinner message="Loading snippets..." />
          </li>
        ) : snippets.length === 0 ? (
          <li className="text-center text-sm text-gray-500">
            No snippets found.
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
                    {snip.title || "Untitled"}
                  </h3>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                <p>Created By:</p>
                <Link
                  href={`/u/${snip.user?.id ?? ""}`}
                  className="hover:underline text-blue-700"
                >
                  {snip.user?.name || "Unknown"}
                </Link>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                <p>Programming Language:</p>
                <Link
                  href={`/tags/language/${snip.language?.id ?? ""}`}
                  className="hover:underline"
                >
                  <LanguageColor language={snip.language?.name || "Unknown"} />
                </Link>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                <p>Topics:</p>
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
                  <span className="text-xs text-gray-500">Code Preview</span>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-semibold">
                      Complexity: {analyzeComplexity(snip.code)}
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

              <div className="flex justify-end">
                <div className="flex items-center gap-2">
                  <Link
                    href={`/snippets/${snip.id}`}
                    className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm font-medium"
                  >
                    <span className="flex items-center gap-1">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                      View
                    </span>
                  </Link>
                  <Button
                    type="button"
                    className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium"
                    onClick={() => handleCopy(snip.id)}
                  >
                    <span className="flex items-center gap-1">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 16h8M8 12h8m-6 8h6a2 2 0 002-2V6l-6-4H8a2 2 0 00-2 2v2"
                        />
                      </svg>
                      Copy link
                    </span>
                  </Button>
                  <Button
                    type="button"
                    className="px-4 py-2 bg-red-400 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium"
                    onClick={() => handleConfirmDelete(snip.id)}
                  >
                    <span className="flex items-center gap-1">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                      Delete
                    </span>
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
