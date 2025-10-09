"use client";

import { useState, useEffect } from "react";
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

const SnippetEditFormWrapper = ({ snippet }: { snippet: ApiSnippet }) => {
  const [showEditForm, setShowEditForm] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

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

  if (showEditForm) {
    return (
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
    );
  }

  return (
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
  );
};

export default SnippetEditFormWrapper;
