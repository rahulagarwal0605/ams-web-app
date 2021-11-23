//jshint esversion:9
require("dotenv").config();


const jwt = require('jsonwebtoken');

function isAuthenticated(req,res,next){
  const { token } = req.cookies;
  // if not token then send error

  const decoded = jwt.verify(token,process.env.JWT_ACCES_TOKEN);
  req.userId=decoded.id;
  next();
}

function authorizeRoles(roles) {
  return (req,res,next) => {
    const { token } = req.cookies;
    const decoded = jwt.verify(token,process.env.JWT_ACCES_TOKEN);
    if(decoded.type!==role)
      console.log("Not authorized");
      next();
  };

}

//module.exports ={isAuthenticated,authorizeRoles};
