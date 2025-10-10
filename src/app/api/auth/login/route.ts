import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { comparePassword } from "@/lib/hash";
export const runtime = "nodejs";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  console.log("login", email, password);
  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password are required" },
      { status: 400 }
    );
  }
  const allUsers = await prisma.user.findMany();
  console.log("allUsers", allUsers);
  const user = await prisma.user.findUnique({ where: { email } });
  console.log("user", user);
  if (!user)
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  const ok = await comparePassword(password, user.passwordHash);
  if (!ok)
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  const res = NextResponse.json({
    id: user.id,
    email: user.email,
    name: user.name,
  });
  res.cookies.set("token", user.id, {
    httpOnly: false,
    sameSite: "lax",
    path: "/",
  });
  return res;
}
