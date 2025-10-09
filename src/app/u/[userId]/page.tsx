import Link from "next/link";
import LanguageColor from "@/components/LanguageColor";
import UITag from "@/components/UITag";

async function fetchUserSnippets(userId: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/api/users/${userId}/snippets`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) {
    return { snippets: [] } as { snippets: any[] };
  }
  return res.json();
}

export default async function UserProfilePage({
  params,
}: {
  params: { userId: string };
}) {
  const { userId } = params;
  const data = await fetchUserSnippets(userId);
  const snippets = data.snippets ?? [];

  return (
    <section className="rounded-2xl p-8 bg-gradient-to-br from-white via-gray-50 to-blue-50 shadow-xl border border-gray-200/50 backdrop-blur-sm">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent">
          User Profile
        </h1>
        <p className="text-gray-600 text-sm">Snippets by user: {userId}</p>
      </div>

      <ul className="space-y-6">
        {snippets.length === 0 ? (
          <li className="text-center text-sm text-gray-500">
            No snippets found.
          </li>
        ) : (
          snippets.map((snip: any) => (
            <li
              key={snip.id}
              className="group bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.01]"
            >
              <div className="mb-3">
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors">
                  {snip.title || "Untitled"}
                </h3>
              </div>

              <div className="flex items-center justify-between gap-2 text-sm text-gray-500">
                <p>Programming Language:</p>
                <Link
                  href={`/tags/language/${snip.language?.id ?? ""}`}
                  className="hover:underline"
                >
                  <LanguageColor language={snip.language?.name || "Unknown"} />
                </Link>
              </div>
              <div className="flex items-center justify-between gap-2 text-sm text-gray-500 mb-2">
                <p>Topics:</p>
                <div className="flex flex-wrap gap-2">
                  {(snip.topics ?? []).length === 0 ? (
                    <UITag>—</UITag>
                  ) : (
                    (snip.topics ?? []).map((t: any) => (
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

              <div className="bg-gray-50 rounded-xl p-4 mb-4 font-mono text-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-500">Code Preview</span>
                </div>
                <pre className="whitespace-pre-wrap break-words text-gray-800">
                  {snip.code?.slice(0, 240)}
                  {snip.code && snip.code.length > 240 ? "\n..." : ""}
                </pre>
              </div>

              <div className="flex justify-end">
                <div className="flex items-center gap-2">
                  <Link
                    href={`/u/${userId}`}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                  >
                    Back to profile
                  </Link>
                </div>
              </div>
            </li>
          ))
        )}
      </ul>
    </section>
  );
}
