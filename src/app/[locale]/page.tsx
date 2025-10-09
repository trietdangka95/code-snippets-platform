import { redirect } from "next/navigation";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function RootPage({ params }: Props) {
  const { locale } = await params;

  // Redirect to home page with locale
  redirect(`/${locale}/home`);
}

