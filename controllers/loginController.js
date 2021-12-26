// jshint esversion:9

require("dotenv").config();
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const sendToken = require('../util/jwtToken');
const bcrypt = require('bcrypt');
const ApiError = require('../util/ApiError');

exports.login = (req, res,next) => {
  	var username = req.body.username;
  	var password = req.body.password;
	var user;
	db.query(
		"SELECT Login.UserName, Login.Password, Login.Type, Instructor.InstructorID FROM Login inner join Instructor on Login.LoginID = Instructor.LoginID where Login.UserName=?",
		[username],
		(err, rows) => {
			if (!err) {
				if (rows[0] !== undefined) {
					user = {id:rows[0].InstructorID, username:rows[0].UserName, type:rows[0].Type};
					bcrypt.compare(password, rows[0].Password, function(err, result) {  // Compare
						// if passwords match
						if (result) {
							sendToken(user,res);
						}
						// if passwords do not match
						else {
							res.json({status: "error", data: null, message: "Invalid user details"});
              //return next(new ApiError("Invalid user details",401));
						}
					  });
				} else {
					res.json({status: "error", data: null, message: "Invalid user details"});
          //return next(new ApiError("Invalid user details",401));
				}
			} else {
				console.log(err);
			}
		}
	);
};

exports.logout = (req, res,next) => {
  res.cookie('token',null,{expires:new Date(Date.now()), httpOnly:true });
  res.status(200).json({
    success: "success",
	data: null,
    message: 'Logged out'
  });
};
