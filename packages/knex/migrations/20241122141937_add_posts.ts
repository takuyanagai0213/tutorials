import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("posts", (table) => {
    table.increments("id").primary();
    table.string("name").defaultTo("test");
    table.string("content").defaultTo("test");
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("posts");
}

