import { createKysely } from "@vercel/postgres-kysely";
import { DB } from "./db";

const db = createKysely<DB>();

export { db };
