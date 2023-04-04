const AppError = require('../utils/appError');

const handleJWTError = () => new AppError('Invalid token', 401);

const handleJWTExpiredError = () => new AppError('expired token', 402);

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stck: err.stack,
  });
};
const sendErrorProd = (err, req, res, next) => {
  if (err.isOperational)
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  else {
    console.error('Error', 'err');

    res.status(500).json({
      status: 'error',
      message: 'something went wrong!',
    });
  }
};
module.exports = (err, req, res, next) => {
  console.log(err.stack);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'devlopment') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };

    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === 'ValidationError')
      error = handleValidationErrorDB(error);

    if (error.name === 'jsonWebTokenError') error = handleJWTError();
    sendErrorProd(error, req);
  }
  if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();
  sendErrorProd(error, res);
};
