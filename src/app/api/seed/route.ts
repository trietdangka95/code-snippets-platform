import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST() {
  try {
    const languages = [
      { name: "JavaScript", color: "#f7df1e" },
      { name: "TypeScript", color: "#3178c6" },
      { name: "Python", color: "#3572A5" },
      { name: "Go", color: "#00ADD8" },
    ];
    const topics = [
      { name: "Algorithms" },
      { name: "Data Structures" },
      { name: "Utilities" },
    ];

    for (const l of languages) {
      await prisma.language.upsert({
        where: { name: l.name },
        update: l,
        create: l,
      });
    }
    for (const t of topics) {
      await prisma.topic.upsert({
        where: { name: t.name },
        update: t,
        create: t,
      });
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json({ error: "Seed failed" }, { status: 500 });
  }
}
