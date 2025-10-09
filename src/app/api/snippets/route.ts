import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { extractUserId } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { title, code, languageName, topics } = await req.json();

    const userId = extractUserId(req);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let language = await prisma.language.findUnique({
      where: { name: languageName },
    });
    if (!language) {
      language = await prisma.language.create({
        data: { name: languageName },
      });
    }

    const snippet = await prisma.snippet.create({
      data: {
        title,
        code,
        user: { connect: { id: userId } },
        language: { connect: { id: language.id } },
      },
    });

    if (topics && topics.length > 0) {
      for (const topicName of topics) {
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
            snippetId: snippet.id,
            topicId: topic.id,
          },
        });
      }
    }

    return NextResponse.json(snippet, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create snippet" },
      { status: 500 }
    );
  }
}

// GET /api/snippets?languageId=&topicId=
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const languageId = url.searchParams.get("languageId") ?? undefined;
    const topicId = url.searchParams.get("topicId") ?? undefined;

    const snippets = await prisma.snippet.findMany({
      where: {
        ...(languageId ? { languageId } : {}),
        ...(topicId ? { topics: { some: { topicId } } } : {}),
      },
      include: {
        user: true,
        language: true,
        topics: { include: { topic: true } },
      },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ snippets });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch snippets" },
      { status: 500 }
    );
  }
}
