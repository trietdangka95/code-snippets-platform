import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const userId = params.id;
    const snippets = await prisma.snippet.findMany({
      where: { userId },
      include: { language: true, topics: { include: { topic: true } } },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ snippets });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch user's snippets" },
      { status: 500 }
    );
  }
}
