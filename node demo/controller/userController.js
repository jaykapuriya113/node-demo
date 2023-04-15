const User=require("../model/userModel");
const AppError=require("../errorHandler/AppError");
const jwt = require('jsonwebtoken');
// const signToken=(id)=>{
//   return jwt.sign({_id:id},process.env.JWT_SECRET,{
//     expiresIn: process.env.JWT_EXPIRES_IN,
//   })
// }
exports.createUsers=async (req,res)=>{
    const newUser = await User.create(req.body);
    console.log(newUser)

    res.status(201).json({
        status: "success",
        dats:{
            user: newUser,
        }
    })
};
exports.loginUser=async(req,res,next)=>{
  const {email,password }=req.body;
  try{
 if (!email || !password) {
    return next(new AppError('please provide email n pass', 400));
  }
  const user=await User.findOne({email:email}).select('+password');
 if(!user){
  return next(new AppError('user not exist', 400));
 }
  const token =jwt.sign({_id:user._id},process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRES_IN,});
  // const token=signToken(user._id);
  res.status(200).json({
    status: "success",
    data:{
      user,
      token
    }
}) 
  } catch(err){
    return next(new AppError("Incorrect email or password",401))
  }
}

exports.getAllUsers= async(req,res) => {
  try{  const users= await User.find();

    res.status(200).json({
        status: "success",
        result: users.length,
        data:{
            users
        }
    })}
    catch(err){
        return next(new AppError({err},500))
    }
};


