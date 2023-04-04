require('dotenv').config();
const crypto = require('crypto');
// const { promisify } = require("util");
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const jwt = require('jsonwebtoken');
const AppError = require('./../utils/appError');
const sendEmail = require("./../utils/email");
const { log } = require('console');
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);

  const token = signToken(newUser._id);
  console.log(token);
  res.status(201).json({
    status: 'succes',
    data: {
      user: newUser,
    },
  });
});

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  //cheak email and passwor
  if (!email || !password) {
    return next(new AppError('please provide email n pass', 400));
  }
  //check if user exist $$ password corrects
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('incorrect email or password', 401));
  }

  //if everything ok,send token
  const token = signToken(user._id);
  res.status(200).json({
    status: 'succes',
    token,
  });
};
exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  console.log('token', token);
  if (!token) {
    return next(new AppError('you are not log in', 401));
  }
  //verify token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  console.log('decoded', decoded.id);

  //check if user still exists

  const freshUser = await User.findById(decoded.id);
  console.log(freshUser);
  if (!freshUser) {
    return next(new AppError('token does not exists', 401));
  }
  // check if user pass after token issued
  console.log(freshUser.changedPasswordAfter(decoded.iat))
  if (freshUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError('user recentily chenged password please login sgain', 401)
    );
  }
  //grant access to route
  req.user = freshUser;
  next();
});
exports.restrictTo = (...roles) => {
  console.log(...roles)
  return (req,res,next) => {
    if(!roles.includes(req.user.role)) {
      return next(new AppError('you do not have permission to perform this action',403))
    }
    console.log("restricting done")
    next();
  };
};
exports.forgotPassword=catchAsync(async(req,res,next) => {
  //get user based on posted email
 const user = await User.findOne({ email: req.body.email});
 if(!user) {
  return next(new AppError("there is no user with email",404))
 }
  //generte the randome reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({validateBeforeSave: false });
  console.log(resetToken)
  //send it to user's email
  const resetURL =`${req.protocol}://${req.get('host')}
  /api/v1/users/resetpassword/${resetToken}`;
  const message = `forget pass and create new password to: ${resetURL}.`
 try{
  await sendEmail({
    email: user.email,
    subject: "your pass reset token(valid for 10 min)",
    message:message
  })
  res.status(200).json({
    status : 'success',
    message: "token send to email"
  });
}catch(err){
  user.createPasswordResetToken=undefined;
  user.createPasswordResetExpires = undefined;
  await user.save({ validateBeforeSave: false});

  return next(new AppError('there was an error sendng the email.'),500)
}
});

exports.resetPassword=catchAsync(async(req,res,next) => {
  //1) get user based on the token
  const hashedToken = crypto
  .createHash('sha256')
  .update(req.params.token)
  .digest('hex');
console.log("passwordResetToken",hashedToken)
  const user=await User.findOne({passwordResetToken: hashedToken})
  console.log(user)
  //2) if token has not expired, and there is user,set the new password
 if(!user) {
  return next(new AppError('token is invalid or has expired'))
 }
 user.password =req.body.password;
 user.passwordConfirm =req.body.passwordConfirm;
//  user.password = undefined;
//  user.passwordConfirm = undefined;
 await user.save({validateBeforeSave: false });

  //3) Update changedPasswordAt property for the user

  //4) log the user in ,send JWT
  const token=signToken(user._id)

  res.status(200).json({
    status: 'succes',
    token,
  });
});
exports.updatePassword =catchAsync(async (req,res,next) => {

  //1) get user from collection
 const user = await user.findById(req.body.id).select('+password');
  //2) check if posted current password is correct
  if(!(await user.correctPassword(req.body.passwordCurrent, user.password)))
  return next(new AppError('your current password is wrong.',401));
  //3)if so update password
  user.password = req.body.password;
  user.passwordConfirm =req.body.passwordConfirm;
  await user.save();
  //4)log user in send JWT
})
