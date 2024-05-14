const mysql = require('mysql2/promise')

const {
    MYSQL_HOST_NAME,
    MYSQL_USERNAME,
    MYSQL_PASSWORD,
    MYSQL_PORT,
    MYSQL_DB_NAME
} = process.env;

const connection = mysql.createPool({
    host: MYSQL_HOST_NAME,
    port: MYSQL_PORT,
    database: MYSQL_DB_NAME,
    user: MYSQL_USERNAME,
    password: MYSQL_PASSWORD
});

module.exports = connection;