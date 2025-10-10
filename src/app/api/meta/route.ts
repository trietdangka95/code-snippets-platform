import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
export const runtime = "nodejs";

export async function GET() {
  const [languages, topics] = await Promise.all([
    prisma.language.findMany({ orderBy: { name: "asc" } }),
    prisma.topic.findMany({ orderBy: { name: "asc" } }),
  ]);
  return NextResponse.json({ languages, topics });
}
