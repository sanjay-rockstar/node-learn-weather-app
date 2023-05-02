console.log('This is client side JS');

// const url =
//         "http://api.weatherstack.com/current?access_key=43dabd2c89d9db678d5ff7c725ef8f85&query=Shimla&units=m";

// fetch(url).then((response)=> response.json()
// .then((data)=> console.log(data)))
// .catch((error)=> console.log(error));

const searchForm = document.querySelector('form');
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const address = document.querySelector('input').value;

    const error_message = document.querySelector('#message-1');
    if (address.length == 0) {
        return error_message.textContent = "Enter an address first!";
    }
    error_message.textContent = "Loading...";

    const weather_message = document.querySelector('#message-2');
    weather_message.innerHTML = "";

    const url = 'http://localhost:4000/weather?address=' + address;

    fetch(url).then((response) => response.json()
        .then((data) => {
            error_message.textContent = "";
            weather_message.innerHTML = data.weather;
        }))
        .catch((error) => {
            error_message.innerHTML = error
        }
        );
})