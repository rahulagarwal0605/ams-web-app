const db = require('../config/db');
const bcrypt = require ('bcrypt');

const saltRounds = 10;

var username = "rahulagarwal";
var password = "rahulagarwal";
var statement = "insert into Login(UserName, Password, Type) values (?, ?, ?);";

bcrypt.hash(password, saltRounds, function(err, hash) {
  let values = [username, hash, "Instructor"];
  console.log("value of hash:"+ hash);
  db.query(statement, values, function(err,res) {
    if (err) throw err;
    else {
            console.log("stored!");
        }
  });
});
