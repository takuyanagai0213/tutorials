// eslint.config.js

import safeql from "@ts-safeql/eslint-plugin/config";
import tseslint from "typescript-eslint";

export default tseslint.config(
  // ...
  safeql.configs.connections({
    // read more about configuration in the next section
    databaseUrl: "postgres://postgres:postgres@localhost:5431/my_database",
    targets: [{ tag: "sql" }],

  })
);

const query = sql<{ id: Number, name: string }>`SELECT id, name FROM users WHERE id = ${1}`;
