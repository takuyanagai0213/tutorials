import { Kysely, PostgresDialect} from "kysely";

import {DB} from "kysely-codegen";
import {Pool} from "pg";

const db = new Kysely<DB>({
  dialect: new PostgresDialect({
    pool: new Pool({
      connectionString: process.env.DATABASE_URL,
    }),
  }),
});

const createUser = async () => {
  return await db.insertInto("User").values({
    name: "Alice",
  }).
  executeTakeFirst();
}

const getUsers = async () => {
  return await db.selectFrom("User").selectAll().execute();
};

const main = async () => {
  const user = await createUser();
  console.log(user);

  const users = await getUsers();
  console.log(users);
}

main();
