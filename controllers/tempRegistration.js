const db = require('../config/db'); // connection variable
const bcrypt = require ('bcrypt'); // bcrypt

const saltRounds = 10; // data processing time

var username = "rahulagarwal";
var password = "rahulagarwal";

// query statement to store hash
var statement = "insert into Login(UserName, Password, Type) values (?, ?, ?);";

// salt, hash, and store
bcrypt.hash(password, saltRounds, function(err, hash) {
  let values = [username, hash, "Instructor"]; // query values
  // store hash in database
  db.query(statement, values, function(err,res) {
    if (err) throw err;
    else {
            console.log("stored!");
        }
  });
});