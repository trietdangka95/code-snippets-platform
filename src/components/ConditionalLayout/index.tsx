"use client";
import { usePathname } from "next/navigation";
import HeaderPage from "@/components/HeaderPage";
import FooterPage from "@/components/FooterPage";

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

const ConditionalLayout = ({ children }: ConditionalLayoutProps) => {
  const pathname = usePathname();
  const pathnameIncludes = ["/login"];
  const showHeaderFooter = !pathnameIncludes.includes(pathname);

  if (!showHeaderFooter) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <HeaderPage />
      <main className="flex-1">{children}</main>
      <FooterPage />
    </div>
  );
};

export default ConditionalLayout;
