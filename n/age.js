///4

// In the JavaScript file, you have a program that performs a GET request on the route
//https://coderbyte.com/api/challenges/json/date-list and then create a new array of objects with a date property
// and a value property with at least one item per day between the earliest and latest dates in the input array. If
// there is no data for a particular day, the value should be 0.
// Finally, console log an array of objects as a string.

const axios = require('axios')

const countAge= async () => {
const data = await axios.get('https://coderbyte.com/api/challenges/json/age-counting')
let jsonData = await data.data
const arr = jsonData.data.split(', ')
let obj = []
for (let i = 0; i < arr.length; i = i + 2) {

let key = arr[i].split('=')[1]
let age = arr[i + 1].split('=')[1]
let d = {
key: key,
age: age
}
obj.push(d)
}
let count = 0
let count1 = 0
let temp = 1
for (let i = 0; i < obj.length; i++) {
if (obj[i].age >= 50) {
// console.log(temp)
temp++
count++
}
}
console.log(count)
}

countAge()
