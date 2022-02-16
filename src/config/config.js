const { createPool } = require("mysql2");

const pool = createPool({
    port: "3306",
    host: "localhost",
    user: "root",
    password: "@Dmin123$",
    database: "WealthIA",
    connectionLimit: 10
});

module.exports = pool;
