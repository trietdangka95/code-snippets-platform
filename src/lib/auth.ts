import { NextRequest } from "next/server";

export function extractUserId(req: NextRequest | Request): string | null {
  // Try Next.js 15 cookies first
  const token = (req as NextRequest).cookies?.get?.("token")?.value;
  if (token) return token;

  // Fallback to cookie header parsing
  const cookieHeader = req.headers.get?.("cookie") as string | undefined;
  const cookieToken = cookieHeader?.match(/(?:^|; )token=([^;]+)/)?.[1];
  return cookieToken || null;
}
