import { deleteConfession } from "@/app/actions";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  const { id } = await req.json();
  console.log(id);
  const del = await deleteConfession(id);
  if (!del) {
    return NextResponse.json(
      { message: "Cannot delete confession" },
      { status: 404 }
    );
  }

  return NextResponse.json({ message: "Confession deleted successfully" });
}
