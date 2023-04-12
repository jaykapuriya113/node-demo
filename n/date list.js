// in the JavaScript file, you have a program that performs a GET request on the route
// https://coderbyte.com/api/challenges/json/date-list and then create a new array of
// objects with a date property and a value property with at least one item per day between
// the earliest and latest dates in the input array. If there is no data for a particular
// day, the value should be 0.
// Finally, console log an array of objects as a string.

const axios = require('axios');
// Make GET request to the API endpoint
axios.get('https://coderbyte.com/api/challenges/json/date-list')
.then(response => {
const data = response.data;
// Find the earliest and latest dates in the array
const dates = data.map(item => new Date(item.date));
const earliestDate = new Date(Math.min(...dates));
const latestDate = new Date(Math.max(...dates));
// Create a new array of objects with a date property and a value property
const newData = [];
let currentDate = new Date(earliestDate);
while (currentDate <= latestDate) {
const dateString = currentDate.toISOString().slice(0, 10);
const value = data.find(item => item.date.startsWith(dateString))?.value || 0;
newData.push({ date: dateString, value });
currentDate.setDate(currentDate.getDate() + 1);
}
// Log the array of objects as a string
console.log(JSON.stringify(newData));
})
.catch(error => {
console.log(error);
});