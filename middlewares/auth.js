//jshint esversion:9
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
    // check through database that if the user has that role or not
      next();
  };

}

modules.exports ={isAuthenticated,authorizeRoles};
