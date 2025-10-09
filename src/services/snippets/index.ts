interface SnippetPayload {
  title?: string;
  code: string;
  language?: string;
  topic?: string; // comma-separated names from form
  languageId?: string;
  topicIds?: string[];
}

type SnippetFilters = {
  languageId?: string;
  topicId?: string;
};
const snippetService = {
  createSnippet: async (data: SnippetPayload) => {
    const meRes = await fetch("/api/auth/me", { credentials: "include" });
    const meJson = await meRes.json();
    const userId = meJson?.user?.id;
    if (!userId) throw new Error("Unauthorized");

    // 2) compute languageName and topics[]
    let languageName = data.language;
    let topicsArr: string[] = [];

    if (!languageName && data.languageId) {
      // fetch meta to resolve id -> name
      const meta = await fetch("/api/meta", { credentials: "include" }).then(
        (r) => r.json()
      );
      const lang = meta.languages?.find((l: any) => l.id === data.languageId);
      languageName = lang?.name;
    }
    if (data.topic && typeof data.topic === "string") {
      topicsArr = data.topic
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
    } else if (Array.isArray(data.topicIds) && data.topicIds.length) {
      const meta = await fetch("/api/meta", { credentials: "include" }).then(
        (r) => r.json()
      );
      topicsArr = meta.topics
        ?.filter((t: any) => data.topicIds!.includes(t.id))
        .map((t: any) => t.name);
    }

    if (!languageName || topicsArr.length === 0) {
      throw new Error("Language and topics are required");
    }

    const body = {
      title: data.title,
      code: data.code,
      userId,
      languageName,
      topics: topicsArr,
    };

    const res = await fetch("/api/snippets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(body),
    });
    return res.json();
  },
  getSnippets: async (filters?: SnippetFilters) => {
    const params = new URLSearchParams();
    if (filters?.languageId) params.set("languageId", filters.languageId);
    if (filters?.topicId) params.set("topicId", filters.topicId);
    const qs = params.toString();
    const res = await fetch(`/api/snippets${qs ? `?${qs}` : ""}`, {
      credentials: "include",
    });
    return res.json();
  },
  getSnippet: async (id: string) => {
    const res = await fetch(`/api/snippets/${id}`, { credentials: "include" });
    return res.json();
  },
  updateSnippet: async (id: string, data: SnippetPayload) => {
    // Resolve similar to create
    const meRes = await fetch("/api/auth/me", { credentials: "include" });
    const meJson = await meRes.json();
    if (!meJson?.user?.id) throw new Error("Unauthorized");

    let languageName = data.language;
    let topicsArr: string[] = [];
    if (!languageName && data.languageId) {
      const meta = await fetch("/api/meta", { credentials: "include" }).then(
        (r) => r.json()
      );
      languageName = meta.languages?.find(
        (l: any) => l.id === data.languageId
      )?.name;
    }
    if (data.topic) {
      topicsArr = data.topic
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
    } else if (Array.isArray(data.topicIds)) {
      const meta = await fetch("/api/meta", { credentials: "include" }).then(
        (r) => r.json()
      );
      topicsArr = meta.topics
        ?.filter((t: any) => data.topicIds!.includes(t.id))
        .map((t: any) => t.name);
    }

    const body = {
      title: data.title,
      code: data.code,
      languageName,
      topics: topicsArr,
    };
    const res = await fetch(`/api/snippets/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(body),
    });
    return res.json();
  },
  deleteSnippet: async (id: string) => {
    const res = await fetch(`/api/snippets/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    return res.json();
  },
};
export default snippetService;
