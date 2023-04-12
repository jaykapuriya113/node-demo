///1

//Node.js CSV to JSON
// In the JavaScript file, you have a program that performs a GET request on the route
//https:coderbyte.com/api/challenges/logs/user-info-csv and then sort the CSV data by the
// second column.
// Finally, convert the sorted CSV data to a JSON object and console log it as a string.
// Example Input:
// name,email,phone
// John Doe,johndoe@example.com,555-1234
// Jane Smith,janesmith@example.com,555-5678
// Example Output: [{"name":"John Doe","email":"johndoe@example.com","phone":"555-1234"},
// {"name":"Jane Smith","email":"janesmith@example.com","phone":"555-5678"}]


// var axios = require("axios");
// const csvToJson = async () => {
// const data = await axios.get(
// "https://coderbyte.com/api/challenges/logs/user-info-csv"
// );
// const val = await data.data.split("\n");
// const headers = await val[0].split(",");
// let result = [];
// val.shift();
// // console.log(val);
// val.forEach((line) => {
// let obj = {};
// let presentLine = line.split(",");
// // console.log(presentLine);
// headers.forEach((header, i) => {
// obj[header] = presentLine[i];
// });
// result.push(obj);
// });
// console.log(JSON.stringify(result));
// };
// csvToJson();


const axios= require('axios');
const csvToJson = async () => {
const data = await axios.get(
"https://coderbyte.com/api/challenges/logs/user-info-csv"
);
console.log("data",data);
const val =await data.data.split("\n");
const header=await val[0].split(",");
let result= [];
val.shift();
console.log(val);
val.forEach((line)=>{
   let obj={};
   let presentline= line.split(",")
   console.log(presentline);
   header.forEach((header,i)=>{
     obj[header]=presentline[i]
   });
   console.log(obj)
   result.push(obj);
});
console.log(JSON.stringify(result));
}
csvToJson();


