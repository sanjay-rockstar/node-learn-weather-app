const request = require('request')
const chalk = require('chalk')


const getWeather = (address, callbackFun) => {
    const url =
        "http://api.weatherstack.com/current?access_key=43dabd2c89d9db678d5ff7c725ef8f85&query="+ encodeURIComponent(address)+"&units=m";

    request({url, json: true }, (error, {body}) => {
        if (error) {
            console.log('Unable to connect!')
        } else {
            const currentData = body.current;
            console.log('Place: ', address)
            const text = currentData.weather_descriptions[0] + '. It is ' + currentData.temperature +
                ' outside. It feels like ' + currentData.feelslike + '.';
            console.log(text);
        }

    })
    callbackFun();
}

const address = (process.argv.length>2)? process.argv[2]:undefined
if (address) {
getWeather(address, ()=>console.log(chalk.green('Done')));
} else {
    console.log('Please provide an address. ')
}