const asyncHandler=require('express-async-handler');
const axios=require('axios')
const jsonCleaning = asyncHandler(async () => {
  const data = await axios.get(
    "https://coderbyte.com/api/challenges/json/json-cleaning"
  );

  const jsonData = await data.data;

  for (let key in jsonData) {
    if (typeof jsonData[key] === "object") {
      if (Array.isArray(jsonData[key])) {
        let arr = jsonData[key];
        for (let el in arr) {
          if (arr[el] === "-") {
            arr.pop(arr[el]);
          }
        }
      }
      let obj = jsonData[key];
      for (let val in obj) {
        if (obj[val] === "" || obj[val] === "N/A") {
          delete obj[val];
        }
      }
    } else {
      if(jsonData[key] === "-") {
         delete jsonData[key]
      }
    }
  }

  console.log(JSON.stringify(jsonData));
});
jsonCleaning();