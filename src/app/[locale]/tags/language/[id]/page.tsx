// Link not used in this page
import { headers } from "next/headers";
import { Metadata } from "next";
import LanguageColor from "@/components/LanguageColor";
import SnippetMeta from "@/components/SnippetMeta";

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
    cache: "no-store",
  });
  if (!res.ok) return { snippets: [] } as { snippets: ApiSnippet[] };
  return res.json() as Promise<{ snippets: ApiSnippet[] }>;
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const data = await fetchByLanguage(params.id);
  const snippets = data.snippets ?? [];
  const languageName = snippets[0]?.language?.name ?? "Unknown Language";
  const snippetCount = snippets.length;

  return {
    title: `${languageName} Code Snippets`,
    description: `Browse ${snippetCount} code snippets in ${languageName}. Find examples, tutorials, and solutions for ${languageName} programming.`,
    keywords: [
      languageName,
      `${languageName} code snippets`,
      `${languageName} examples`,
      `${languageName} programming`,
      "code snippets",
      "programming",
      "developer",
    ],
    openGraph: {
      title: `${languageName} Code Snippets`,
      description: `Browse ${snippetCount} code snippets in ${languageName}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${languageName} Code Snippets`,
      description: `Browse ${snippetCount} code snippets in ${languageName}`,
    },
    alternates: {
      canonical: `/tags/language/${params.id}`,
    },
  };
}

export default async function LanguageTagPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const data = await fetchByLanguage(id);
  const snippets = data.snippets ?? [];
  const name = snippets[0].language?.name ?? "";
  return (
    <section className="w-full max-w-7xl mx-auto px-6 py-8 mt-10 rounded-2xl p-8 bg-gradient-to-br from-white via-gray-50 to-blue-50 shadow-xl border border-gray-200/50 backdrop-blur-sm">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent">
          Language
        </h1>
        <div className="flex items-center gap-2">
          <p className="text-gray-600 text-sm">Filtered by language:</p>
          <LanguageColor language={name} />
        </div>
      </div>

      <ul className="space-y-6">
        {snippets.length === 0 ? (
          <li className="text-center text-sm text-gray-500">
            No snippets found.
          </li>
        ) : (
          snippets.map((snip: ApiSnippet) => (
            <li
              key={snip.id}
              className="group bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.01]"
            >
              <div className="mb-3">
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors">
                  {snip.title || "Untitled"}
                </h3>
              </div>

              <SnippetMeta
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
