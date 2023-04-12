const axios=require('axios');
const countAge = async () => {
  const data = await axios.get(
    'https://coderbyte.com/api/challenges/json/age-counting'
  );
  const jam = await data.data;
  let obj = [];
  let counter = 0;

  let jsonData = jam.data.split(', ');

  for (let i = 0; i < jsonData.length; i += 2) {
    let key = jsonData[i].split('=')[1];
    let age = jsonData[i + 1].split('=')[1];

    let k = {
      key,
      age,
    };

    obj.push(k);
  }

  for (let i = 0; i < obj.length; i++) {
    if (obj[i].age >= 50) {
      counter++;
    }
  }
  console.log(counter);
};
countAge();