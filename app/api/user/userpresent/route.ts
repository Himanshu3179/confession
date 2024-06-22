import { isAuthenticated } from "@/app/actions";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const isUser = await isAuthenticated();
  if (!isUser) {
    return NextResponse.json(
      { message: "You must be logged in to make a Named confession" },
      { status: 401 }
    );
  }

  return NextResponse.json({ message: "You are logged in" });
}
