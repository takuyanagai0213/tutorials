import { Kysely } from "kysely";
import { DB } from "../db";
import { NeonDialect } from "kysely-neon";

export const db = new Kysely<DB>({
  dialect: new NeonDialect({
    connectionString: process.env.DATABASE_URL!,
  }),
});
