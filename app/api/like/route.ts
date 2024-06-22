import { getUserId } from "@/app/actions";
import { NextResponse } from "next/server";
import db from "@/lib/db";
import { revalidatePath } from "next/cache";
export async function POST(req: Request) {
  try {
    const userId = await getUserId();
    const { confessionId } = await req.json();
    if (!userId) {
      return NextResponse.json(
        { message: "You are not authenticated" },
        { status: 401 }
      );
    }
    const confession = await db.confession.findFirst({
      where: {
        id: confessionId,
      },
    });

    if (!confession) {
      return NextResponse.json(
        { message: "Confession not found" },
        { status: 404 }
      );
    }

    const like = await db.like.findFirst({
      where: {
        confessionId,
        userId,
      },
    });

    if (like) {
      // delete like
      await db.like.delete({
        where: {
          id: like.id,
        },
      });

      return NextResponse.json({ message: "Like removed" });
    }
    // create like

    await db.like.create({
      data: {
        confessionId,
        userId,
      },
    });
    return NextResponse.json({ message: "Post Liked Successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
