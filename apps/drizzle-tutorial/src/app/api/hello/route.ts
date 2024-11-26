import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { NextResponse } from "next/server";
console.log("POSTGRES_URL", process.env.POSTGRES_URL);

export const dynamic = 'force-dynamic';
export const runtime = 'edge';

export const GET = async () => {
  const users = await db.select().from(usersTable)

  return NextResponse.json({ users, message: 'success' });
}
