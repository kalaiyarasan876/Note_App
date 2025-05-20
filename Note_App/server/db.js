const mysql = require("mysql2/promise")
require('dotenv').config()

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.PASSWORD || "",
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE
})


// Test the connection
db.getConnection()
    .then((connection) => {
        console.log("Database Connected Successfully");
        connection.release();
    })
    .catch((err) => {
        console.error("Database Connection Failed", err.message);
    })

module.exports = db;



