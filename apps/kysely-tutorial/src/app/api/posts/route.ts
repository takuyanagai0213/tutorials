import { db } from "@/db";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export const GET = async () => {
  const posts = await db
    .selectFrom("posts_table")
    .selectAll()
    .execute();

  return NextResponse.json({ posts, message: 'success' });
}
