const { createPool } = require("mysql2");

const pool = createPool({
    port: process.env.DB_PORT,
    host: process.env.HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    connectionLimit: 10
});

module.exports = pool;