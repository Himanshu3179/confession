import { getUserId } from "@/app/actions";
import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const fromId = await getUserId();

    const { content, isPublic, isAnonymous } = body;

    if (!fromId && !isAnonymous) {
      return NextResponse.json(
        { message: "You must be logged in to make a Named confession" },
        { status: 401 }
      );
    }

    if (content.length < 5)
      return NextResponse.json(
        { message: "Content must be at least 5 characters long" },
        { status: 400 }
      );

    await db.confession.create({
      data: {
        content,
        fromId,
        isPublic,
        isAnonymous,
      },
    });

    return NextResponse.json(
      { message: "Confession created successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
