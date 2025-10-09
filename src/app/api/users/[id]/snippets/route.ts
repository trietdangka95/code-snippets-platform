import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: userId } = await params;
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true },
    });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    const snippets = await prisma.snippet.findMany({
      where: { userId },
      include: { language: true, topics: { include: { topic: true } } },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ user, snippets });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch user's snippets" },
      { status: 500 }
    );
  }
}
