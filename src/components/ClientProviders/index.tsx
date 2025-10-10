"use client";

import { ToastProvider } from "@/contexts/ToastContext";
import ConditionalLayout from "@/components/ConditionalLayout";
import { NextIntlClientProvider } from "next-intl";

interface ClientProvidersProps {
  children: React.ReactNode;
  messages: Record<string, unknown>;
  locale: string;
}

export default function ClientProviders({
  children,
  messages,
  locale,
}: ClientProvidersProps) {
  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <ToastProvider>
        <ConditionalLayout>{children}</ConditionalLayout>
      </ToastProvider>
    </NextIntlClientProvider>
  );
}
