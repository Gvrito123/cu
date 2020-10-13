const API = '64929040b1f2c19079d8a59d206b7759';
const sunnyweatherimage = document.getElementsByClassName("sunny")[0];
const cloudyweatherimage = document.getElementsByClassName("cloudy")[0];
document.addEventListener('DOMContentLoaded', () => {
    let city = 'Tbilisi';
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API}&units=metric`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            var temperature = data.temp;
            document.getElementById("city").innerHTML = city;
            document.getElementById("temperature").innerHTML = data.main.temp;
            document.getElementById("feelslike").innerHTML = data.main.feels_like;
            document.getElementById("weathertype").innerHTML = data.weather[0].main;
            if (data.weather[0].main == "Clear") {
                sunnyweatherimage.classList.toggle("active");
            }
                else cloudyweatherimage.classList.toggle("active");
        })
        .catch((error) => {
            console.error('Error:', error);
        });
});
