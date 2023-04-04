const mongoose=require("mongoose");


const DB=async()=>{
    try {
     await mongoose.connect("mongodb+srv://jk:jk@cluster0.ltwnkwr.mongodb.net/natours-test?retryWrites=true&w=majority")
        console.log("connection done")
} catch (error) {
    throw new Error(error);
 }
}
module.exports=DB;








//"mongodb+srv://jk:jk@cluster0.ltwnkwr.mongodb.net/?natours-testretryWrites=true&w=majority"