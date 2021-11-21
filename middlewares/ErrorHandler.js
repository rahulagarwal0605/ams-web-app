//jshint esversion:6

const ApiError=require('../util/ApiError');

function apiErrorHandler(err,req,res,next){
  if(err instanceof ApiError)
    res.status(err.statusCode).json({
    success: false,
    message:err.message
    });

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
      error = new AppError(message, 400);
  }

     // Handling Expired JWT error
  if (err.name === 'TokenExpiredError') {
      const message = 'JSON Web Token is expired. Try Again!!!';
      error = new AppError(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message:error.message || "Internal Server Error"
  });
}

module.exports =apiErrorHandler;
