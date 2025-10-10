// Link not used in this page
import { headers } from "next/headers";
import { Metadata } from "next";
import SnippetMeta from "@/components/SnippetMeta";

type ApiSnippet = {
  id: string;
  title: string;
  code: string;
  language?: { id: string; name: string } | null;
  topics?: { topic: { id: string; name: string } }[];
};

type ApiUser = { id: string; name: string | null };

async function fetchUserSnippets(
  userId: string
): Promise<{ user?: ApiUser; snippets: ApiSnippet[] }> {
  const hdrs = await headers();
  const host = hdrs.get("host");
  const proto = hdrs.get("x-forwarded-proto") ?? "http";
  const envBase = process.env.NEXT_PUBLIC_BASE_URL;
  const base =
    envBase && envBase.startsWith("http") ? envBase : `${proto}://${host}`;
  const res = await fetch(`${base}/api/users/${userId}/snippets`, {
    cache: "no-store",
  });
  if (!res.ok) {
    return { snippets: [] } as { user?: ApiUser; snippets: ApiSnippet[] };
  }
  return res.json() as Promise<{ user?: ApiUser; snippets: ApiSnippet[] }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ userId: string }>;
}): Promise<Metadata> {
  const { userId } = await params;
  const data = await fetchUserSnippets(userId);
  const user = data.user;
  const snippets = data.snippets ?? [];
  const userName = user?.name || "Anonymous User";
  const snippetCount = snippets.length;

  return {
    title: `${userName}'s Code Snippets`,
    description: `Browse ${snippetCount} code snippets by ${userName}. Explore ${userName}'s programming examples, solutions, and contributions to the developer community.`,
    keywords: [
      userName,
      `${userName} code snippets`,
      `${userName} programming`,
      "code snippets",
      "programming",
      "developer",
      "portfolio",
    ],
    openGraph: {
      title: `${userName}'s Code Snippets`,
      description: `Browse ${snippetCount} code snippets by ${userName}`,
      type: "profile",
    },
    twitter: {
      card: "summary_large_image",
      title: `${userName}'s Code Snippets`,
      description: `Browse ${snippetCount} code snippets by ${userName}`,
    },
    alternates: {
      canonical: `/u/${userId}`,
    },
  };
}

export default async function UserProfilePage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;
  const data = await fetchUserSnippets(userId);
  const snippets = data.snippets ?? [];
  const user = data.user;

  return (
    <section className="w-full max-w-7xl mx-auto px-6 py-8 mt-10 rounded-2xl p-8 bg-gradient-to-br from-white via-gray-50 to-blue-50 shadow-xl border border-gray-200/50 backdrop-blur-sm">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent">
          User Profile
        </h1>
        <p className="text-gray-600 text-sm">
          Snippets by user: {user?.name ?? userId}
        </p>
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
                isUserProfilePage={true}
                language={snip.language}
                topics={snip.topics}
                code={snip.code}
              />
            </li>
          ))
        )}
      </ul>
    </section>
  );
}
