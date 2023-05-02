const express = require('express');
const path = require('path')
const hbs = require('hbs')
const forecast = require('./utils/forecast')

const app = express();

const staticDirectory = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//  set up handlebars and views
app.set('views', viewsPath);
app.set('view engine', 'hbs');
hbs.registerPartials(partialsPath);

//  use static files, such CSS and html files.
app.use(express.static(staticDirectory));

//  Set the routes
app.get('', (req, res) => {
    res.render('index', {
        title: "Weather App for Daily Use! ",
        author: "Sanjay Kumar",
        name: "Sanjay Kumar"
    })
});

app.get('/about', (req, res) => {
    res.render('about',
        { title: 'About Section.', name: "Sanjay Kumar" })
});

app.get('/help', (req, res) => {
    res.render('help',
        {
            title: "Help Section ",
            message: "Our customer support is available to help you! Please contact us!",
            name: "Sanjay Kumar"
        })
});

app.get('/weather', (request, response) => {

    if (!request.query.address) {
        return response.send('Eror! Please provide an address.')
    }

    const callback = (error, body) => {
        if (error) {
            return response.send({
                message: "Sorry! couldn't fetch the Weather for the given location",
                detail: error

            })
        }
        const currentData = body?body.current:undefined;
        const location = body?body.location:undefined;
        const weatherForecast = currentData?((location?(location.name + 
            ', ' + location.region + ', ' + location.country + '.' 
            + '<br>'):' ') + currentData.weather_descriptions[0] 
            + '! <br>  It is ' + currentData.temperature 
            + ' outside, it feels like ' + currentData.feelslike 
            + '.'):"Place not in our records";

        response.send({
            address: request.query.address,
            weather: weatherForecast
        })
    };

    weather = forecast.getWeather(request.query.address, callback);

}
);

app.get('/help/*', (req, res) => {

    res.render('error', {
        title: "Error!",
        name: "Sanjay Kumar",
        errorMessage: "Help article not found!"
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: "Error!",
        name: "Sanjay Kumar",
        errorMessage: "404 Not Found!"
    })
})

app.listen(4000, () => console.log('Serve is running on port 4000'));