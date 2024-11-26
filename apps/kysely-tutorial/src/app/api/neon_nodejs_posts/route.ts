import { db } from "@/db/neon";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export const GET = async () => {
  const users = await db
    .selectFrom("posts_table")
    .selectAll()
    .execute();

  return NextResponse.json({ users, message: 'success' });
}