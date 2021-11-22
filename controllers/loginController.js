// jshint esversion:9

require("dotenv").config();
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const sendToken = require('../util/jwtToken');
const bcrypt = require('bcrypt');

exports.login = (req, res) => {
  var username = req.body.username;
  var password = req.body.password;
  bcrypt.hash(password, 10, (err, encrypted) => {
    password = encrypted
  })
	db.query(
		"SELECT * FROM Login where username=? and password=?",
		[username, password],
		(err, rows) => {
			if (!err) {
				if (rows[0]) {
          const user = {id:rows[0].userID, type:rows[0].userType};
          sendToken(user,res);
					res.json({status: "success", data: user, message: "Login successful"});
				} else {
					res.json({status: "error", data: null, message: "Invalid user details"});
				}
			} else {
				console.log(err);
			}
		}
	);
};

exports.logout = (req, res) => {
  res.cookie('token',null,{expires:new Date(Date.now()), httpOnly:true });
  res.status(200).json({
    success: "success",
	data: null,
    message: 'Logged out'
  });
};
