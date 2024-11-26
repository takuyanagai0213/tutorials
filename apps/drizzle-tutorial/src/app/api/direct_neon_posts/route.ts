import { db } from "@/db/neon";
import { postsTable } from "@/db/schema";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export const GET = async () => {
  const posts = await db.select().from(postsTable)

  return NextResponse.json({ posts, message: 'success' });
}
