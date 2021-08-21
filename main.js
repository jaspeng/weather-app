const api = {
    key: "425318de1fe1d312443c9c1d8e7bec87", 
    base: "https://api.openweathermap.org/data/2.5/"
}


const searchbox = document.querySelector('.search-box'); 
searchbox.addEventListener('keypress', setQuery); 

function setQuery(evt) {
    if (evt.keyCode == 13){
        getResults(searchbox.value);
        console.log(searchbox.value);
    }
}

function getResults (query) {
    fetch(`${api.base}forecast?q=${query}&units=imperial&cnt=5&APPID=${api.key}`)
        .then(weather => {
            return weather.json();
        }).then(displayResults);
}

function displayResults (weather) {
    var city = document.querySelector('.location .city');
    city.innerText = `${weather.city.name}, ${weather.city.country} Forecast`; 

    var now = new Date(); 
    var date = document.querySelectorAll('.date'); 
    for (var i = 0, len = date.length; i < len; i++) {
        date[i].innerText = dateBuilder(now, i); 
    }

    var weather_el = document.querySelectorAll('.weather');
    for (var i = 0, len = weather_el.length; i < len; i++) {
        weather_el[i].innerText = `${weather.list[i].weather[0].description}`; 
    }

    var weather_icon = document.querySelectorAll('.weather-icon');
    for (var i = 0, len = weather_icon.length; i < len; i++) {
        weather_icon[i].innerHTML = `<img src="icons/${weather.list[i].weather[0].icon}.png" width="70" height="70">`;
    }

    var temp = document.querySelectorAll('.temp');
    for (var i = 0, len = temp.length; i < len; i++) {
        temp[i].innerText = `${Math.round(weather.list[i].main.temp)}°F`;
    }

    var feels_like = document.querySelectorAll('.feelslike');
    for (var i = 0, len = feels_like.length; i < len; i++) {
        feels_like[i].innerText = `feels like: ${Math.round(weather.list[i].main.feels_like)}°F`;
    }

    var humidity = document.querySelectorAll('.humidity');
    for (var i = 0, len = humidity.length; i < len; i++) {
        humidity[i].innerText = `humidity: ${Math.round(weather.list[i].main.humidity)}`;
    }

    var high_low = document.querySelectorAll('.hi-lo');
    for (var i = 0, len = high_low.length; i < len; i++) {
        high_low[i].innerText = `high-low: ${Math.round(weather.list[i].main.temp_max)}-${Math.round(weather.list[i].main.temp_min)}°F`;
    }
}

function dateBuilder (d, num) {
    let months = ["January", "Feburary", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", 
    "Friday", "Saturday",];

    var setDay; 
    if ((d.getDay() + num) > 6) {
        setDay = (d.getDay() + num) - 7; 
    }
    else {
        setDay = d.getDay() + num; 
    }

    var setDate = d.getDate() + num; 
    var setMonth = d.getMonth(); 

    let day = days[setDay]; 
    let date = setDate; 
    let month = months[setMonth];  

    return `${day} \n ${month} ${date}`;
}