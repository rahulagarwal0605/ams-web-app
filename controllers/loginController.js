// jshint esversion:9

require("dotenv").config();
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const sendToken = require('../util/jwtToken');
const bcrypt = require('bcrypt');

exports.login = (req, res) => {
  	var username = req.body.username;
  	var password = req.body.password;
	var userPassword;
	var user;
	bcrypt.hash(password, 10, (err, encrypted) => {
		password = encrypted
	})
	db.query(
		"SELECT * FROM Login where UserName=? and Password=?",
		[username, password],
		(err, rows) => {
			if (!err) {
				if (rows[0]) {
					user = {id:rows[0].LoginID, username:rows[0].UserName, type:rows[0].Type};
					userPassword = rows[0].Password;
				} else {
					res.json({status: "error", data: null, message: "Invalid user details"});
				}
			} else {
				console.log(err);
			}
		}
	);
	bcrypt.compare(userPassword, password, function(err, result) {  // Compare
		// if passwords match
		if (result) {
			sendToken(user,res);
			res.json({status: "success", data: user, message: "Login successful"});
		}
		// if passwords do not match
		else {
			res.json({status: "error", data: null, message: "Invalid user details"});
		}
	  });
};

exports.logout = (req, res) => {
  res.cookie('token',null,{expires:new Date(Date.now()), httpOnly:true });
  res.status(200).json({
    success: "success",
	data: null,
    message: 'Logged out'
  });
};
