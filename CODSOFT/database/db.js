import pkg from "pg";
const { Pool } = pkg;
const pool = new Pool({
    user: "postgres",
    password: "ramro@123",
    host: "localhost",
    port: 5432,
    database: "codsoft"
});

export default pool;