import { Database } from './types'
import {Pool} from "pg";

import {Kysely, PostgresDialect} from "kysely";

const dialect = new PostgresDialect({
  pool: new Pool({
    database: 'my_database',
    user: 'postgres',
    password: 'password',
    port: 5432,
    max: 10,
  }),
})

export const db = new Kysely<Database>({
  dialect: new PostgresDialect(pool),
})
