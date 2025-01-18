import knex from "knex";

const db = knex({
  client: "pg",
  connection: "postgre://postgres:ramro@123@localhost:5432/mydatabase",
});

export default db;
