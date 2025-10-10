import Link from "next/link";
import { Metadata } from "next";
import { headers } from "next/headers";
import SnippetDetailWrapper from "@/components/SnippetDetailWrapper";
import { DocumentIcon } from "@/components/Icons";

type ApiSnippet = {
  id: string;
  title: string;
  code: string;
  language?: { id: string; name: string } | null;
  topics?: { topic: { id: string; name: string } }[];
  user?: { id: string; name: string | null } | null;
};

async function fetchSnippet(id: string): Promise<ApiSnippet | null> {
  try {
    const headersList = await headers();
    const host = headersList.get("host");
    const protocol = headersList.get("x-forwarded-proto") || "http";
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || `${protocol}://${host}`;

    const res = await fetch(`${baseUrl}/api/snippets/${id}`, {
      cache: "force-cache", // Enable caching for SEO
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    return data.snippet;
  } catch (error) {
    console.error("Error fetching snippet:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const snippet = await fetchSnippet(id);

  if (!snippet) {
    return {
      title: "Snippet Not Found",
      description: "The requested code snippet could not be found.",
    };
  }

  const topics = snippet.topics?.map((t) => t.topic.name).join(", ") || "";
  const language = snippet.language?.name || "Unknown";
  const author = snippet.user?.name || "Anonymous";

  return {
    title: snippet.title || "Untitled Snippet",
    description: `Code snippet: ${snippet.title} in ${language}${
      topics ? ` - Topics: ${topics}` : ""
    } by ${author}. ${snippet.code?.slice(0, 150)}...`,
    keywords: [
      snippet.title,
      language,
      ...(snippet.topics?.map((t) => t.topic.name) || []),
      "code snippet",
      "programming",
      "developer",
    ],
    authors: [{ name: author }],
    openGraph: {
      title: snippet.title || "Code Snippet",
      description: `Code snippet in ${language} by ${author}`,
      type: "article",
      publishedTime: new Date().toISOString(),
      authors: [author],
      tags: snippet.topics?.map((t) => t.topic.name) || [],
    },
    twitter: {
      card: "summary_large_image",
      title: snippet.title || "Code Snippet",
      description: `Code snippet in ${language} by ${author}`,
    },
    alternates: {
      canonical: `/snippets/${id}`,
    },
  };
}

export default async function SnippetDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const snippet = await fetchSnippet(id);

  if (!snippet) {
    return (
      <section className="w-full max-w-7xl mx-auto px-6 py-8 mt-10 rounded-2xl p-8 bg-gradient-to-br from-white via-gray-50 to-blue-50 shadow-xl border border-gray-200/50 backdrop-blur-sm">
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="mb-6">
            <DocumentIcon className="w-24 h-24 text-gray-400 mx-auto" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Snippet Not Found
          </h1>
          <p className="text-gray-600 mb-8 max-w-md">
            The code snippet you&apos;re looking for doesn&apos;t exist or has
            been removed.
          </p>
          <Link
            href="/"
            className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-semibold shadow-lg hover:shadow-xl"
          >
            Back to Home
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full max-w-[calc(100%-2rem)] sm:max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 mt-6 sm:mt-10 rounded-2xl bg-gradient-to-br from-white via-gray-50 to-blue-50 shadow-xl border border-gray-200/50 backdrop-blur-sm overflow-hidden sm:overflow-visible">
      <article>
        <SnippetDetailWrapper snippet={snippet} />
      </article>
    </section>
  );
}
