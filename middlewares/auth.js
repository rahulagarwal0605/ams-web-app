require("dotenv").config();

const jwt = require('jsonwebtoken');

function isAuthenticated(req,res,next){
  const { token } = req.cookies;
  const decoded = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
  req.userId=decoded.id;
  next();
}

function authorizeRoles(role) {
  return (req,res,next) => {
    const { token } = req.cookies;
    const decoded = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
    if(decoded.type!==role){
      res.json({ status: "error", data: null, message: "Not Authorized"});
    }
    else
      next();
  };

}

module.exports ={isAuthenticated,authorizeRoles};
