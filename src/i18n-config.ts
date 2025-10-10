// i18n-config.ts
import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";
import enMessages from "../messages/en.json";
import viMessages from "../messages/vi.json";

export const locales = ["en", "vi"] as const;
export type Locale = (typeof locales)[number];

const messagesMap: Record<Locale, Record<string, unknown>> = {
  en: enMessages,
  vi: viMessages,
};

export default getRequestConfig(({ locale }) => {
  if (!locale || !locales.includes(locale as Locale)) {
    notFound();
  }

  return {
    locale,
    messages: messagesMap[locale as Locale],
  };
});
