require("dotenv").config();

const ApiError=require('../util/ApiError');

function apiErrorHandler(err,req,res,next){
  if(err instanceof ApiError){
  console.log("in instance of ");
    res.status(err.statusCode).json({
    success: false,
    message:err.message
    });
  }
  else{
    var error;
    if (err.name === 'CastError') {
        const message = `Resource not found. Invalid: ${err.path}`;
        error = new ApiError(message, 400);
    }
    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(value => value.message);
        error = new ApiError(message, 400);
    }


    if (err.name === 'JsonWebTokenError') {
        const message = 'JSON Web Token is invalid. Try Again!!!';
        error = new ApiError(message, 400);
    }
    
    if (err.name === 'TokenExpiredError') {
        const message = 'JSON Web Token is expired. Try Again!!!';
        error = new ApiError(message, 400);
    }

    res.status(err.statusCode).json({
      success: false,
      message:error.message || "Internal Server Error"
    });
  }
}

module.exports =apiErrorHandler;
