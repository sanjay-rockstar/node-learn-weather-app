const fs = require('fs')
const { buffer } = require('stream/consumers')

const bufferJson = fs.readFileSync('./1-json.json')

const jsonData = bufferJson.toString()
var data = JSON.parse(jsonData)
data.name = 'Sanjay'
data.age = 35
console.log(data)
const updatedJson = JSON.stringify(data)
fs.writeFileSync('./1-json.json', updatedJson)