import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Discover and share code snippets in various programming languages. Browse the latest code examples, tutorials, and solutions from the developer community.",
  keywords: [
    "code snippets",
    "programming",
    "javascript",
    "python",
    "react",
    "nextjs",
    "developer tools",
    "code examples",
    "programming tutorials",
  ],
  openGraph: {
    title: "Code Snippets Platform - Home",
    description:
      "Discover and share code snippets in various programming languages",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Code Snippets Platform - Home",
    description:
      "Discover and share code snippets in various programming languages",
  },
  alternates: {
    canonical: "/home",
  },
};

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
