const mysql = require("mysql2");

// Connection Creation
const db = mysql.createPool({
	host: process.env.DATABASE_HOST,
	user: process.env.DATABASE_USER,
	password: process.env.DATABASE_PASSWORD,
	database: process.env.DATABASE,
	multipleStatements: true,
});

// const db = mysql.createPool({
// 	host: "us-cdbr-east-04.cleardb.com",
// 	user: "b59d1fb4b16184",
// 	password: "6b103a8f",
// 	database: "heroku_ce068efd190b24d",
// 	multipleStatements: true,
// });

module.exports = db;