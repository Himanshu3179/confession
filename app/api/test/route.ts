import { generateUniqueName } from "@/app/actions";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { name } = await req.json();
  const username = await generateUniqueName(name);
  return NextResponse.json({ username });
}
