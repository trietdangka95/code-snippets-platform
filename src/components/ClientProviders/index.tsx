"use client";

import { ToastProvider } from "@/contexts/ToastContext";
import { UserProvider } from "@/contexts/UserContext";
import ConditionalLayout from "@/components/ConditionalLayout";
import { NextIntlClientProvider } from "next-intl";
import { ToastContainer } from "@/components/ui/ToastContainer";

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
    <NextIntlClientProvider messages={messages} locale={locale} timeZone="UTC">
      <UserProvider>
        <ToastProvider>
          <ConditionalLayout>{children}</ConditionalLayout>
          <ToastContainer />
        </ToastProvider>
      </UserProvider>
    </NextIntlClientProvider>
  );
}
