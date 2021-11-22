class ApiError extends Error{
    constructor(message,statusCode){
      super(message);
      this.statusCode = statusCode;
      Error.captureStackTrace(this, this.constructor);
    }

    static badRequest(message){
      return new ApiError(message,400);
    }

    static internalError(message){
      return new ApiError(message,500);
    }
}

module.exports = ApiError;
