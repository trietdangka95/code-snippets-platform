"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import SnippetMeta from "@/components/SnippetMeta";
import SnippetEditForm from "@/components/SnippetEditForm";
import Button from "@/components/ui/Button";

type ApiSnippet = {
  id: string;
  title: string;
  code: string;
  language?: { id: string; name: string } | null;
  topics?: { topic: { id: string; name: string } }[];
  user?: { id: string; name: string | null } | null;
};

export default function SnippetDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const [snippet, setSnippet] = useState<ApiSnippet | null>(null);
  const [loading, setLoading] = useState(true);
  const [showEditForm, setShowEditForm] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    const loadSnippet = async () => {
      try {
        const res = await fetch(`/api/snippets/${id}`, {
          credentials: "include",
        });
        const data = await res.json();
        if (active) {
          setSnippet(data.snippet || null);
        }
      } catch {
        if (active) setSnippet(null);
      } finally {
        if (active) setLoading(false);
      }
    };
    loadSnippet();
    return () => {
      active = false;
    };
  }, [id]);

  useEffect(() => {
    let active = true;
    const loadCurrentUser = async () => {
      try {
        const res = await fetch("/api/auth/me", { credentials: "include" });
        const data = await res.json().catch(() => ({}));
        if (res.ok && active) {
          setCurrentUserId(data?.user?.id || null);
        }
      } catch (error) {
        console.error("Error loading current user:", error);
      }
    };
    loadCurrentUser();
    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return (
      <section className="w-full max-w-7xl mx-auto px-6 py-8 mt-10 rounded-2xl p-8 bg-gradient-to-br from-white via-gray-50 to-blue-50 shadow-xl border border-gray-200/50 backdrop-blur-sm">
        <div className="flex items-center justify-center py-16">
          <div className="text-gray-500">Loading...</div>
        </div>
      </section>
    );
  }

  if (!snippet) {
    return (
      <section className="w-full max-w-3xl mx-auto px-6 py-16 mt-12 rounded-2xl bg-gradient-to-br from-white via-gray-50 to-blue-50 shadow-xl border border-gray-200/50 backdrop-blur-sm">
        <div className="flex flex-col items-center text-center">
          <div className="mb-6 inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-100 text-blue-600 shadow-sm">
            <svg
              className="w-7 h-7"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172A4 4 0 1014.828 10.5M21 21l-5.2-5.2"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent mb-2">
            Snippet not found
          </h2>
          <p className="text-gray-600 text-sm max-w-md">
            The snippet you’re looking for may have been removed or the URL is
            incorrect.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Home
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section>
      {!showEditForm ? (
        <div className="w-full max-w-7xl mx-auto px-6 py-8 mt-10 rounded-2xl p-8 bg-gradient-to-br from-white via-gray-50 to-blue-50 shadow-xl border border-gray-200/50 backdrop-blur-sm">
          <div className="mb-6">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent">
              {snippet.title || "Untitled"}
            </h1>
          </div>

          <SnippetMeta
            user={snippet.user}
            language={snippet.language}
            topics={snippet.topics}
            code={snippet.code}
          />

          <div className="flex justify-between items-center mt-10">
            <Link
              href="/"
              className="px-4 py-2 bg-white border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
            >
              Back
            </Link>
            <Button
              onClick={() => {
                if (currentUserId && currentUserId === snippet?.user?.id) {
                  setShowEditForm(true);
                }
              }}
              disabled={!currentUserId || currentUserId !== snippet?.user?.id}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
            >
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                Edit
              </span>
            </Button>
          </div>
        </div>
      ) : (
        <>
          <SnippetEditForm
            id={snippet.id}
            defaultTitle={snippet.title || ""}
            defaultCode={snippet.code || ""}
            defaultLanguage={snippet.language?.name || ""}
            defaultTopics={
              snippet.topics?.map((t) => t.topic.name).join(", ") || ""
            }
            onSuccess={() => {
              setShowEditForm(false);
              // Reload snippet data
              window.location.reload();
            }}
            onCancel={() => setShowEditForm(false)}
          />
        </>
      )}
    </section>
  );
}
