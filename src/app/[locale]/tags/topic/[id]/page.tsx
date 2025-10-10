// Link not used in this page
import { headers } from "next/headers";
import { Metadata } from "next";
import SnippetMeta from "@/components/SnippetMeta";
import { prisma } from "@/lib/prisma";
import { Suspense } from "react";
import { InlineSpinner } from "@/components/ui/Loading";
export const runtime = "nodejs";

type ApiSnippet = {
  id: string;
  title: string;
  code: string;
  language?: { id: string; name: string } | null;
  topics?: { topic: { id: string; name: string } }[];
  user?: { id: string; name: string | null } | null;
};

async function fetchByTopic(id: string): Promise<{ snippets: ApiSnippet[] }> {
  const hdrs = await headers();
  const host = hdrs.get("host");
  const proto = hdrs.get("x-forwarded-proto") ?? "http";
  const envBase = process.env.NEXT_PUBLIC_BASE_URL;
  const base =
    envBase && envBase.startsWith("http") ? envBase : `${proto}://${host}`;
  const res = await fetch(`${base}/api/snippets?topicId=${id}`, {
    cache: "force-cache",
    next: { revalidate: 60 }, // Cache for 60 seconds
  });
  if (!res.ok) return { snippets: [] } as { snippets: ApiSnippet[] };
  return res.json() as Promise<{ snippets: ApiSnippet[] }>;
}

async function fetchTopicById(
  id: string
): Promise<{ id: string; name: string } | null> {
  try {
    const topic = await prisma.topic.findUnique({
      where: { id },
      select: { id: true, name: true },
    });
    return topic;
  } catch (error) {
    console.error("Error fetching topic:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  // Simplified metadata without fetching data to avoid double API calls
  return {
    title: `Topic Code Snippets`,
    description: `Browse code snippets by topic. Find examples, tutorials, and solutions related to various programming topics.`,
    keywords: ["code snippets", "programming", "developer", "topic"],
    openGraph: {
      title: `Topic Code Snippets`,
      description: `Browse code snippets by topic`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `Topic Code Snippets`,
      description: `Browse code snippets by topic`,
    },
    alternates: {
      canonical: `/tags/topic/${id}`,
    },
  };
}

async function TopicTagContent({ id }: { id: string }) {
  const topic = await fetchTopicById(id);
  const topicName = topic?.name ?? "Unknown Topic";

  const data = await fetchByTopic(id);
  const snippets = data.snippets ?? [];

  return (
    <section className="w-full max-w-[calc(100%-2rem)] sm:max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 mt-6 sm:mt-10 rounded-2xl bg-gradient-to-br from-white via-gray-50 to-blue-50 shadow-xl border border-gray-200/50 backdrop-blur-sm overflow-hidden sm:overflow-visible">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent">
          Topic
        </h1>
        <p className="text-gray-600 text-sm">Filtered by topic: {topicName}</p>
      </div>

      <ul className="space-y-6">
        {snippets.length === 0 ? (
          <li className="text-center text-sm text-gray-500">
            No snippets found.
          </li>
        ) : (
          snippets.map((snip: ApiSnippet) => (
            <li key={snip.id}>
              <SnippetMeta
                title={snip.title}
                language={snip.language}
                topics={snip.topics}
                user={snip.user}
                code={snip.code}
              />
            </li>
          ))
        )}
      </ul>
    </section>
  );
}

export default async function TopicTagPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <Suspense
      fallback={
        <div className="w-full max-w-[calc(100%-2rem)] sm:max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 mt-6 sm:mt-10 rounded-2xl bg-gradient-to-br from-white via-gray-50 to-blue-50 shadow-xl border border-gray-200/50 backdrop-blur-sm overflow-hidden sm:overflow-visible">
          <div className="flex items-center justify-center py-12">
            <InlineSpinner message="Loading topic snippets..." />
          </div>
        </div>
      }
    >
      <TopicTagContent id={id} />
    </Suspense>
  );
}
