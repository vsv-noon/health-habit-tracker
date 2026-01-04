import pkg from "pg";

const { Pool, types } = pkg;

// OID 1082 = DATE
types.setTypeParser(1082, value => value);

export const pool = new Pool({
  user: "postgres",
  password: "postgres",
  host: "localhost",
  port: 5432,
  database: "todo-db",
});
