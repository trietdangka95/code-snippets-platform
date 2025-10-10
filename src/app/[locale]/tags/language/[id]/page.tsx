// Link not used in this page
import { headers } from "next/headers";
import { Metadata } from "next";
import LanguageColor from "@/components/LanguageColor";
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

async function fetchByLanguage(
  id: string
): Promise<{ snippets: ApiSnippet[] }> {
  const hdrs = await headers();
  const host = hdrs.get("host");
  const proto = hdrs.get("x-forwarded-proto") ?? "http";
  const envBase = process.env.NEXT_PUBLIC_BASE_URL;
  const base =
    envBase && envBase.startsWith("http") ? envBase : `${proto}://${host}`;
  const res = await fetch(`${base}/api/snippets?languageId=${id}`, {
    cache: "force-cache",
    next: { revalidate: 60 }, // Cache for 60 seconds
  });
  if (!res.ok) return { snippets: [] } as { snippets: ApiSnippet[] };
  return res.json() as Promise<{ snippets: ApiSnippet[] }>;
}

async function fetchLanguageById(
  id: string
): Promise<{ id: string; name: string } | null> {
  try {
    const language = await prisma.language.findUnique({
      where: { id },
      select: { id: true, name: true },
    });
    return language;
  } catch (error) {
    console.error("Error fetching language:", error);
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
    title: `Language Code Snippets`,
    description: `Browse code snippets by programming language. Find examples, tutorials, and solutions for various programming languages.`,
    keywords: ["code snippets", "programming", "developer", "language"],
    openGraph: {
      title: `Language Code Snippets`,
      description: `Browse code snippets by programming language`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `Language Code Snippets`,
      description: `Browse code snippets by programming language`,
    },
    alternates: {
      canonical: `/tags/language/${id}`,
    },
  };
}

async function LanguageTagContent({ id }: { id: string }) {
  const language = await fetchLanguageById(id);
  const languageName = language?.name ?? "Unknown Language";

  const data = await fetchByLanguage(id);
  const snippets = data.snippets ?? [];

  return (
    <section className="w-full max-w-[calc(100%-2rem)] sm:max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 mt-6 sm:mt-10 rounded-2xl bg-gradient-to-br from-white via-gray-50 to-blue-50 shadow-xl border border-gray-200/50 backdrop-blur-sm overflow-hidden sm:overflow-visible">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent">
          {languageName}
        </h1>
        <div className="flex items-center gap-2">
          <p className="text-gray-600 text-sm">Filtered by language:</p>
          <LanguageColor language={languageName} />
        </div>
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
                isLanguagePage={true}
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

export default async function LanguageTagPage({
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
            <InlineSpinner message="Loading language snippets..." />
          </div>
        </div>
      }
    >
      <LanguageTagContent id={id} />
    </Suspense>
  );
}
