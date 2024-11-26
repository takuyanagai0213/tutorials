import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { PrismaNeon } from '@prisma/adapter-neon'
import { Pool } from '@neondatabase/serverless'

export const runtime = 'edge'

export async function GET() {

  const neon = new Pool({ connectionString: process.env.DATABASE_POSTGRES_PRISMA_URL })
  const adapter = new PrismaNeon(neon)
  const prisma = new PrismaClient({ adapter })

  const posts = await prisma.post.findMany()

  return NextResponse.json(posts, { status: 200 })
}
