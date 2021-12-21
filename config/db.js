const mysql = require("mysql2");

// Connection Creation
const db = mysql.createPool({
	host: "us-cdbr-east-04.cleardb.com",
	user: "b59d1fb4b16184",
	password: "6b103a8f",
	database: "heroku_ce068efd190b24d",
	multipleStatements: true,
});

module.exports = db;