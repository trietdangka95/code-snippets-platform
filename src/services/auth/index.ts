const authService = {
  login: async (email: string, password: string) => {
    console.log("login", email, password);
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data?.error || `Login failed (${res.status})`);
    return data;
  },
  logout: async () => {
    const res = await fetch("/api/auth/logout", {
      method: "POST",
    });
    return res.json();
  },
  me: async () => {
    const res = await fetch("/api/auth/me", { method: "GET" });
    const data = await res.json().catch(() => ({}));
    if (!res.ok)
      throw new Error(data?.error || `Fetch me failed (${res.status})`);
    return data;
  },
  register: async (email: string, password: string, name: string) => {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok)
      throw new Error(data?.error || `Register failed (${res.status})`);
    return data;
  },
};

export default authService;
