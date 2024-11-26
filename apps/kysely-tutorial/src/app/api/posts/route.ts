import { db } from "@/db/vercel_postgres";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export const GET = async () => {
  const posts = await db
    .selectFrom("Post")
    .selectAll()
    .execute();

  return NextResponse.json({ posts, message: 'success' });
}
