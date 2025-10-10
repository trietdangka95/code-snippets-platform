import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
export const runtime = "nodejs";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: userId } = await params;

    const result = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        snippets: {
          include: { language: true, topics: { include: { topic: true } } },
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!result) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const { snippets, ...user } = result;
    return NextResponse.json({ user, snippets });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch user's snippets" },
      { status: 500 }
    );
  }
}
