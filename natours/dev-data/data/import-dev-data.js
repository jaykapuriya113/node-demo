const dotenv=require("dotenv");
const mongoose=require("mongoose")
const fs=require("fs")
// const app=require("./../../app");
const DB=require("./../../db/conn");
const Tour=require("./../../models/tourModel");

DB();

// const testTour=new Tour({
//     name:"The Forest Hiker",
//     rating:4.7,
//     price:470
// });

// testTour.save().then(doc =>{
    //     console.log(doc);
    // }).catch(err=>{
        //     console.log('error',err);
        // })
        // const port=3000;
        // app.listen(port,()=>{
            //     console.log(`app running on port ${port}...`)
            // });
            

const tours=JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`,"utf-8"));
console.log(tours);
const importData=async ()=>{
    try{
      await Tour.create(tours);
      console.log('Data load')
    }catch(err){
        console.log(err)
    }  process.exit();
};

const deletData=async ()=>{
    try{
      await Tour.deleteMany()
      console.log('Data delete');
    
    }catch(err){
        console.log(err)
    }  process.exit();
};
if(process.argv[2]=== '--import'){
    importData();
}else if(process.argv[2]==='--delete'){
    deletData();
}
