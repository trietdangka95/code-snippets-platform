import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { extractUserId } from "@/lib/auth";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  // Extract and validate user
  const userId = extractUserId(req);

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    return NextResponse.json({ error: "Invalid user" }, { status: 401 });
  }

  const body: {
    title?: string;
    code?: string;
    language?: string;
    topic?: string;
    tags?: string | string[];
  } = await req.json();
  const { title, code, language, topic, tags } = body;
  const tagsText: string | undefined =
    typeof tags === "string"
      ? tags
      : Array.isArray(tags)
      ? (tags as string[]).join(", ")
      : undefined;
  const updated = await prisma.snippet.update({
    where: { id },
    data: {
      title,
      code,
      ...(language ? { language } : {}),
      ...(topic ? { topic } : {}),
      tags: tagsText,
    },
  });
  return NextResponse.json({ snippet: updated });
}

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const snippet = await prisma.snippet.findUnique({ where: { id } });
  if (!snippet) {
    return NextResponse.json({ error: "Snippet not found" }, { status: 404 });
  }
  return NextResponse.json({ snippet });
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  // Extract and validate user
  const userId = extractUserId(req);

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    return NextResponse.json({ error: "Invalid user" }, { status: 401 });
  }

  await prisma.snippet.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
