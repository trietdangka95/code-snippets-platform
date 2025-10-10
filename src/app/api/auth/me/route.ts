import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";
export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const token = req.cookies?.get?.("token")?.value;
  // Fallback for Next 15 req
  const cookieHeader = req.headers.get?.("cookie") as string | undefined;
  const cookieToken = cookieHeader?.match(/(?:^|; )token=([^;]+)/)?.[1];
  const id = token || cookieToken;
  if (!id) return NextResponse.json({ user: null }, { status: 200 });
  const user = await prisma.user.findUnique({
    where: { id },
    select: { id: true, email: true, name: true },
  });
  return NextResponse.json({ user });
}
