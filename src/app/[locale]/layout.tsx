import { notFound } from "next/navigation";
import { locales } from "@/i18n-config";
import ClientProviders from "@/components/ClientProviders";
import enMessages from "../../../messages/en.json";
import viMessages from "../../../messages/vi.json";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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

  let messages: Record<string, unknown> = {};
  if (locale === "en") {
    messages = enMessages;
  } else if (locale === "vi") {
    messages = viMessages;
  }

  return (
    <ClientProviders locale={locale} messages={messages}>
      {children}
    </ClientProviders>
  );
}
