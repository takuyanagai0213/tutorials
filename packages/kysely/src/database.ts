import { Database } from './types'
import {Pool} from "pg";

import {Kysely, PostgresDialect} from "kysely";

export const dialect = new PostgresDialect({
  pool: new Pool({
    host: 'localhost',
    database: 'my_database',
    user: 'postgres',
    password: 'postgres',
    port: 5431,
    max: 10,
  }),
})

export const db = new Kysely<Database>({
  dialect,
})
