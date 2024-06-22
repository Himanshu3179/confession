import { NextResponse } from "next/server";
import db from "@/lib/db";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Please fill in all fields" },
        { status: 400 }
      );
    }

    // name cannot include 'anonymous' or 'anon'

    if (
      name.toLowerCase().includes("anonymous") ||
      name.toLowerCase().includes("anon")
    ) {
      return NextResponse.json(
        { message: "Username cannot include 'anonymous'" },
        { status: 400 }
      );
    }

    // name cannot include spaces

    if (name.includes(" ")) {
      return NextResponse.json(
        { message: "Username cannot include spaces" },
        { status: 400 }
      );
    }

    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      return NextResponse.json(
        { message: "This email already exists" },
        { status: 400 }
      );
    }

    const nameExists = await db.user.findUnique({
      where: {
        name: name.toLowerCase(),
      },
    });

    if (nameExists) {
      return NextResponse.json(
        { message: "This username already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.user.create({
      data: {
        name: name.toLowerCase(),
        email,
        hashedPassword,
      },
    });

    return NextResponse.json({ message: "User created" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
