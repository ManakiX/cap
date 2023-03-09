const mysql = require('mysql2');
require('dotenv').config();

let sql = mysql.createPool({
    host: process.env.dbHost,
    user: process.env.dbUser,
    password: process.env.dbPass,
    database: process.env.database,
    port: process.env.DB_PORT,
    multipleStatements: true
});

module.exports = sql;