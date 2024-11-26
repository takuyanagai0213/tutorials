import { drizzle } from "drizzle-orm/node-postgres";
import { seed } from "drizzle-seed";
import 'dotenv/config';
import { postsTable, usersTable } from "./schema";

async function main() {
  const db = drizzle(process.env.POSTGRES_URL!);
  // await seed(db, { usersTable });
  await seed(db, { postsTable }, { count: 1000 });
}
main();
