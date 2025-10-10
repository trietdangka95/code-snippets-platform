import { notFound } from "next/navigation";
import { locales } from "@/i18n-config";
import ClientProviders from "@/components/ClientProviders";
import enMessages from "../../../messages/en.json";
import viMessages from "../../../messages/vi.json";
import { Geist, Geist_Mono } from "next/font/google";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!locales.includes(locale as (typeof locales)[number])) {
    notFound();
  }

  // Load messages directly
  let messages: Record<string, unknown> = {};
  if (locale === "en") {
    messages = enMessages;
  } else if (locale === "vi") {
    messages = viMessages;
  }

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientProviders locale={locale} messages={messages}>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
