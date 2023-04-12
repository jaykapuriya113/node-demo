const axios = require("axios");

let processData = "hd";
const getData = async (url) => {
  const res = await axios.get(
    "https://coderbyte.com/api/challenges/json/age-counting"
  );
  // console.log(res);
  processData = await res.data.data;
  const datas = processData.split(", ");
  let counter = 0;
  /* age > 50 code */
  datas.forEach((el) => {
    if (el.startsWith("age")) {
      el = el.replace("age=", "");
      if (el * 1 > 50) counter++;
    }
  });
  /* 10-15 index of keys */
  const keys = datas.filter((val) => {
    return val.includes("key");
  });
  const key = keys.map((e) => e.split("=")[1]);
  console.log(key.slice(10, 15).join(" "));
  /* JSON cleaning (remove "", "N/A") */
  const cleanedkeys = key.filter((el) => {
    if (el != "" || el != "N/A") return el;
  });
  console.log(cleanedkeys.length);
  console.log(key.length);
};
getData();
