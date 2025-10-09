"use client";

import { useState } from "react";
import SnippetCreatePage from "@/components/SnippetCreatePage";
import SnippetPage from "@/components/SnippetPage";

const HomePage = () => {
  const [refreshToken, setRefreshToken] = useState<number>(0);
  const handleCreated = () => setRefreshToken((t) => t + 1);

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <SnippetPage refreshToken={refreshToken} />
        <SnippetCreatePage onCreated={handleCreated} />
      </div>
    </div>
  );
};

export default HomePage;
