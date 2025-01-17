import { createKysely } from "@vercel/postgres-kysely";
import { DB } from "../db";

const db = createKysely<DB>({
  connectionString: process.env.DATABASE_URL,
});

export { db };
