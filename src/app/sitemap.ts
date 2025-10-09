import { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
  ];

  try {
    // Dynamic snippet pages
    const snippets = await prisma.snippet.findMany({
      select: { id: true, updatedAt: true },
      orderBy: { updatedAt: "desc" },
    });

    const snippetPages: MetadataRoute.Sitemap = snippets.map((snippet) => ({
      url: `${baseUrl}/snippets/${snippet.id}`,
      lastModified: snippet.updatedAt,
      changeFrequency: "weekly",
      priority: 0.8,
    }));

    // Language pages
    const languages = await prisma.language.findMany({
      select: { id: true },
    });

    const languagePages: MetadataRoute.Sitemap = languages.map((language) => ({
      url: `${baseUrl}/tags/language/${language.id}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    }));

    // Topic pages
    const topics = await prisma.topic.findMany({
      select: { id: true },
    });

    const topicPages: MetadataRoute.Sitemap = topics.map((topic) => ({
      url: `${baseUrl}/tags/topic/${topic.id}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    }));

    // User profile pages
    const users = await prisma.user.findMany({
      select: { id: true },
    });

    const userPages: MetadataRoute.Sitemap = users.map((user) => ({
      url: `${baseUrl}/u/${user.id}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    }));

    return [
      ...staticPages,
      ...snippetPages,
      ...languagePages,
      ...topicPages,
      ...userPages,
    ];
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return staticPages;
  }
}
