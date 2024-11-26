import { db } from "@/db/neon";
import { usersTable } from "@/db/schema";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';
export const runtime = 'edge';

export const GET = async () => {
  const users = await db.select().from(usersTable)

  return NextResponse.json({ users, message: 'success' });
}
