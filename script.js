const API = '64929040b1f2c19079d8a59d206b7759';

const sunnyweatherimage = document.getElementsByClassName("sunny")[0];

const cloudyweatherimage = document.getElementsByClassName("cloudy")[0];

const searchButton = document.getElementsByClassName('search-btn')[0]

function getCityFromInput(){
    return document.getElementById('input-city').value;
}

searchButton.addEventListener("click",function(){
    displayWeather(getCityFromInput());

});

function displayWeather(qalaqi){
    let city = qalaqi;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API}&units=metric`)
        .then(response => response.json())
        .then(data => {
            console.log(data)   
            if (data.main === undefined){
                document.getElementById('main').style.display='none';
                document.getElementById('error').style.display='block';
                console.log(data.temp)
                
            }
            else {
                document.getElementById('main').style.display='block';
                document.getElementById('error').style.display='none';
                document.getElementById("temperature-label").style.display = "flex";
                document.getElementById("feels-like-label").style.display = "flex";
                var temperature = data.temp;
                document.getElementById("city").innerHTML = city;
                document.getElementById("temperature").innerHTML = data.main.temp;
                document.getElementById("feelslike").innerHTML = data.main.feels_like;
                document.getElementById("weathertype").innerHTML = data.weather[0].main;
                if (data.weather[0].main == "Clear") {
                    sunnyweatherimage.classList.add("active");
                    cloudyweatherimage.classList.remove("active");
                    
                }
                else {
                    cloudyweatherimage.classList.add("active");
                    sunnyweatherimage.classList.remove('active');
                }
            }
            
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    
}

