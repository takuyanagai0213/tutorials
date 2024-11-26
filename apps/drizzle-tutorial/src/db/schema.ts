import { boolean, pgTable, serial, text } from "drizzle-orm/pg-core";

export const usersTable = pgTable('User', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
})

export const postsTable = pgTable('Post', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  published: boolean('published').notNull(),
  authorId: text('authorId').notNull(),
})
