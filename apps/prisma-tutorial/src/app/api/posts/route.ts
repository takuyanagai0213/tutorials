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
  const posts_1 = await prisma.post.findMany()
  const posts_2 = await prisma.post.findMany()
  const posts_3 = await prisma.post.findMany()
  const posts_4 = await prisma.post.findMany()
  const posts_5 = await prisma.post.findMany()
  const posts_6 = await prisma.post.findMany()
  const posts_7 = await prisma.post.findMany()
  const posts_8 = await prisma.post.findMany()

  console.log(posts_1)
  console.log(posts_2)
  console.log(posts_3)
  console.log(posts_4)
  console.log(posts_5)
  console.log(posts_6)
  console.log(posts_7)
  console.log(posts_8)

  return NextResponse.json(posts, { status: 200 })
}
