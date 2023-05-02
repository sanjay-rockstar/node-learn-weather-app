const request = require('request')


const getWeather = (address, callback) => {
    const url =
        "http://api.weatherstack.com/current?access_key=43dabd2c89d9db678d5ff7c725ef8f85&query=" + encodeURIComponent(address) + "&units=m";

    var response = {}
    request({ url, json: true }, (error, { body = {} }) => {
        if (error) {
            return error
        } else {
            console.log(body);
            callback(error, body)
        }
    })
}

module.exports = { getWeather: getWeather }

// const address = (process.argv.length>2)? process.argv[2]:undefined
// if (address) {
// getWeather(address, ()=>console.log(chalk.green('Done')));
// } else {
//     console.log('Please provide an address. ')
// }