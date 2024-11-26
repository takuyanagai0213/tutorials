import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { PrismaNeon } from '@prisma/adapter-neon'
import { Pool } from '@neondatabase/serverless'

export const runtime = 'nodejs'

export async function GET() {

  const neon = new Pool({ connectionString: process.env.DATABASE_POSTGRES_PRISMA_URL })
  const adapter = new PrismaNeon(neon)
  const prisma = new PrismaClient({ adapter })

  const users = await prisma.user.findMany()

  return NextResponse.json(users, { status: 200 })
}
