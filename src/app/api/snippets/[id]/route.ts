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
    topics?: string;
  } = await req.json();
  const { title, code, language, topics } = body;
  // Ensure only owner can update
  const existing = await prisma.snippet.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: "Snippet not found" }, { status: 404 });
  }
  if (existing.userId !== userId) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  // Handle language update
  let languageId = existing.languageId;
  if (language) {
    let languageRecord = await prisma.language.findUnique({
      where: { name: language },
    });
    if (!languageRecord) {
      languageRecord = await prisma.language.create({
        data: { name: language },
      });
    }
    languageId = languageRecord.id;
  }

  // Handle topics update
  if (topics !== undefined) {
    // Delete existing topic relationships
    await prisma.snippetTopic.deleteMany({
      where: { snippetId: id },
    });

    // Add new topic relationships
    if (topics && topics.length > 0) {
      const topicNames = topics
        .split(",")
        .map((t: string) => t.trim())
        .filter(Boolean);
      for (const topicName of topicNames) {
        let topic = await prisma.topic.findUnique({
          where: { name: topicName },
        });
        if (!topic) {
          topic = await prisma.topic.create({
            data: { name: topicName },
          });
        }

        await prisma.snippetTopic.create({
          data: {
            snippetId: id,
            topicId: topic.id,
          },
        });
      }
    }
  }

  const updated = await prisma.snippet.update({
    where: { id },
    data: {
      title,
      code,
      ...(languageId !== existing.languageId ? { languageId } : {}),
    },
    include: {
      user: true,
      language: true,
      topics: { include: { topic: true } },
    },
  });
  return NextResponse.json({ snippet: updated });
}

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const snippet = await prisma.snippet.findUnique({
    where: { id },
    include: {
      user: true,
      language: true,
      topics: { include: { topic: true } },
    },
  });
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

  await prisma.$transaction([
    prisma.snippetTopic.deleteMany({ where: { snippetId: id } }),
    prisma.snippet.delete({ where: { id } }),
  ]);
  return NextResponse.json({ ok: true });
}
