const dotenv=require("dotenv");
const mongoose=require("mongoose")
const app=require("./app");
const DB=require("./db/conn");
const Tour=require("./models/tourModel");

DB();

const port=3000;
app.listen(port,()=>{
    console.log(`app running on port ${port}...`)
});

