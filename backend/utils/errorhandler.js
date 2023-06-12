class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor); //if we write err.stack in error.js we get exact location of error
  }
}
module.exports = ErrorHandler;
