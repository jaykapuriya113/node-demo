const User=require("./../models/userModel");
const catchAsync=require("./../utils/catchAsync");


exports.getAllUsers=catchAsync(async(req,res) =>{
    const users =await User.find();
   
  
    res.status(200)
    .json({
      status:"success",
      result:users.length,
      data:{
         users
      }
    })  
});
exports.createUsers=(req,res) =>{
    res.status(500).json({
        status:"error",
        message:"This route is not yet define"

    });
}
exports.getUser=(req,res) =>{
    res.status(500).json({
        status:"error",
        message:"This route is not yet define"

    });

}
exports.updateUser=(req,res) =>{
    res.status(500).json({
        status:"error",
        message:"This route is not yet define"

    });
}
exports.deleteUser=(req,res) =>{
    res.status(500).json({
        status:"error",
        message:"This route is not yet define"

    });
}
// exports.deleteAll= async (req,res) =>{
//     await User.deleteMany()
//     res.status(201).json({
//         status:"error",
//         message:"deleted"

//     });
// }

