import { db } from "@/db/neon";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';
export const runtime = 'edge';

export const GET = async () => {
  const users = await db
    .selectFrom("User")
    .selectAll()
    .execute();

  return NextResponse.json({ users, message: 'success' });
}
