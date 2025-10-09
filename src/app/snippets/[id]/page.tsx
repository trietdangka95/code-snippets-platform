import Link from "next/link";
import { headers } from "next/headers";
import LanguageColor from "@/components/LanguageColor";
import UITag from "@/components/UITag";

async function fetchSnippet(id: string) {
  const hdrs = headers();
  const host = hdrs.get("host");
  const proto = hdrs.get("x-forwarded-proto") ?? "http";
  const envBase = process.env.NEXT_PUBLIC_BASE_URL;
  const base =
    envBase && envBase.startsWith("http") ? envBase : `${proto}://${host}`;
  const res = await fetch(`${base}/api/snippets/${id}`, { cache: "no-store" });
  if (!res.ok) return null;
  const data = await res.json();
  return data.snippet ?? null;
}

export default async function SnippetDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const snippet = await fetchSnippet(id);

  if (!snippet) {
    return (
      <section className="rounded-2xl p-8 bg-gradient-to-br from-white via-gray-50 to-blue-50 shadow-xl border border-gray-200/50 backdrop-blur-sm">
        <p className="text-sm text-gray-500">Snippet not found.</p>
      </section>
    );
  }

  return (
    <section className="w-6xl mt-10 mx-auto rounded-2xl p-8 bg-gradient-to-br from-white via-gray-50 to-blue-50 shadow-xl border border-gray-200/50 backdrop-blur-sm">
      <div className="mb-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent">
          {snippet.title || "Untitled"}
        </h1>
      </div>

      <div className="flex items-center justify-between gap-2 text-sm text-gray-500 mb-2">
        <p>Programming Language:</p>
        <Link
          href={`/tags/language/${snippet.language?.id ?? ""}`}
          className="hover:underline"
        >
          <LanguageColor language={snippet.language?.name || "Unknown"} />
        </Link>
      </div>

      <div className="flex items-center justify-between gap-2 text-sm text-gray-500 mb-6">
        <p>Topics:</p>
        <div className="flex flex-wrap gap-2">
          {(snippet.topics ?? []).length === 0 ? (
            <UITag>—</UITag>
          ) : (
            (snippet.topics ?? []).map((t: any) => (
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

      <div className="bg-gray-50 rounded-xl p-4 mb-6 font-mono text-sm">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-500">Code</span>
        </div>
        <pre className="whitespace-pre-wrap break-words text-gray-800">
          {snippet.code}
        </pre>
      </div>

      <div className="flex justify-between items-center">
        <Link
          href="/"
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
        >
          Back
        </Link>
        <a
          href={`/snippets/${id}`}
          className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium"
        >
          Open URL
        </a>
      </div>
    </section>
  );
}
