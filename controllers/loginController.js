// jshint esversion:9

require("dotenv").config();
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const sendToken = require('../util/jwtToken');

exports.login = (req, res) => {
  // authenticate user
  // assign id in variable userID
  const user = {id:userID};
  sendToken(user,res);
};

exports.logout = (req, res) => {
  res.cookie('token',null,{expires:new Date(Date.now()), httpOnly:true });
  res.status(200).json({
    success:true,
    message:'Logged out'
  });
};
