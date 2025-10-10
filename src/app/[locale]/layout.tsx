import { notFound } from "next/navigation";
import { locales } from "@/i18n-config";
import { getMessages } from "next-intl/server";
import ClientProviders from "@/components/ClientProviders";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as (typeof locales)[number])) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  let messages: Record<string, unknown> = {};
  try {
    messages = await getMessages({ locale });
  } catch (error) {
    console.error("Failed to load messages:", error);
    // Fallback to empty messages
    messages = {};
  }

  return (
    <html lang={locale || "en"}>
      <body>
        <ClientProviders messages={messages} locale={locale}>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
