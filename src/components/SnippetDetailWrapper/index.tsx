"use client";

import { useState } from "react";
import SnippetMeta from "@/components/SnippetMeta";
import SnippetEditFormWrapper from "@/components/SnippetEditFormWrapper";

type ApiSnippet = {
  id: string;
  title: string;
  code: string;
  language?: { id: string; name: string } | null;
  topics?: { topic: { id: string; name: string } }[];
  user?: { id: string; name: string | null } | null;
};

interface SnippetDetailWrapperProps {
  snippet: ApiSnippet;
}

const SnippetDetailWrapper = ({ snippet }: SnippetDetailWrapperProps) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      {!isEditing && (
        <SnippetMeta
          language={snippet.language}
          topics={snippet.topics}
          user={snippet.user}
          code={snippet.code}
        />
      )}

      <div className="flex justify-end gap-2">
        <SnippetEditFormWrapper
          snippet={snippet}
          onEditStateChange={setIsEditing}
        />
      </div>
    </>
  );
};

export default SnippetDetailWrapper;
