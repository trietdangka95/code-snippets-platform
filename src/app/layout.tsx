import type { Metadata } from "next";
import "./globals.css";
import { Inter, JetBrains_Mono } from "next/font/google";
import { headers } from "next/headers";

export const runtime = "nodejs";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Code Snippets Platform",
    template: "%s | Code Snippets Platform",
  },
  description:
    "Share and discover code snippets in various programming languages. Find solutions, learn new techniques, and contribute to the developer community.",
  keywords: [
    "code snippets",
    "programming",
    "javascript",
    "python",
    "react",
    "nextjs",
    "developer tools",
  ],
  authors: [{ name: "Code Snippets Team" }],
  creator: "Code Snippets Platform",
  publisher: "Code Snippets Platform",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
  ),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Code Snippets Platform",
    description:
      "Share and discover code snippets in various programming languages",
    siteName: "Code Snippets Platform",
  },
  twitter: {
    card: "summary_large_image",
    title: "Code Snippets Platform",
    description:
      "Share and discover code snippets in various programming languages",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const pathname =
    headersList.get("x-pathname") || headersList.get("x-url") || "";
  const locale = pathname.split("/")[1] || "en";

  return (
    <html lang={locale}>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
