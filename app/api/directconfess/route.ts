import { getIdFromName, getUserId } from "@/app/actions";
import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const fromId = await getUserId();

    const { content, toName, isAnonymous } = body;
    if (content.length < 5) {
      return NextResponse.json(
        { message: "Content must be at least 5 characters long" },
        { status: 400 }
      );
    }

    const toId = await getIdFromName(toName);
    if (!toId) {
      return NextResponse.json(
        { message: "This User does not exist" },
        { status: 404 }
      );
    }

    await db.confession.create({
      data: {
        content,
        fromId,
        toId,
        isAnonymous,
        isPublic: false,  
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
