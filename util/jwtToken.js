// jshint esversion:6
const jwt = require('jsonwebtoken');
function sendToken(user,res){
  const token = jwt.sign(user,ACCESS_TOKEN_SECRET,{
    expiresIn:process.env.JWT_EXPIRATION_TIME
  });
  const options = {expires: new Date(Date.now() + process.env.COOKIE_EXPIRE_TIME *24 * 60 *60 *1000),httpOnly: true};

  res.cookie('token',token,options).json({
    success: true,
    token,
    user
  });
}

module.exports = sendToken;
