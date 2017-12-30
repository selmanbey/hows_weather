document.addEventListener("DOMContentLoaded", function() {

    var DOMContentJustLoaded = true;
    const button = document.getElementById("city_submit")
    const weatherDiv = document.getElementById("weather_div")

    const apiKey = "&APPID=6befaf55cca534a501c36e38333071ab";
    var cityName = ""
    var city = "?q=" + cityName
    var units = "&units=metric"
    var lat = "0"
    var long = "0"
    var coords = "?lat=" + lat + "&lon=" + long

    var urlByLocation = "https://api.openweathermap.org/data/2.5/weather" + coords + apiKey + units
    var urlByCity = "https://api.openweathermap.org/data/2.5/weather" + city + apiKey + units

    function getCoordinates() {
        if ("geolocation" in navigator) {

            function success(position) {
                lat = String(position.coords["latitude"]);
                long = String(position.coords["longitude"]);
                coords = "?lat="+ lat + "&lon=" + long;
                urlByLocation = "https://api.openweathermap.org/data/2.5/weather" + coords + apiKey + units
                if (DOMContentJustLoaded) {
                    getWeather("byLocation");
                }
            }

            function error() {
                alert("We couldn't establish your location. Please enter your city manually.")
                weatherDiv.innerHTML = "<p>404</p>"
            }

            if (DOMContentJustLoaded) {
                navigator.geolocation.watchPosition(success, error)
            }

        } else {
            alert("We couldn't establish your location. Please enter your city manually.")
            weatherDiv.innerHTML = "<p>404</p>"
        };
    };
   
    function getWeather(method) {

        let xhr = new XMLHttpRequest();

        if (method === "byLocation") {
            xhr.open("GET", urlByLocation, true)         
        } else {
            xhr.open("GET", urlByCity, true)
        }
        
        xhr.send()

        xhr.onload = function() {
            if (xhr.status === 200) {
                let rawData = JSON.parse(xhr.responseText)

                let data =  "<p> City: <span>" + rawData.name + "</span></p>" +
                "<p> Weather Status: <span>" + rawData.weather[0].main + "</span></p>" +
                "<p> Weather Description: <span>" + rawData.weather[0].description + "</span></p>" +
                "<p> Temperature: <span>" + rawData.main.temp + "º</span></p>" +
                "<p> Humidity: <span>" + rawData.main.humidity + "</span></p>" 

                weatherDiv.innerHTML = data;

            } else {
                alert(xhr.statusText)
            }      
        };
    };

    function getCity() {
        let cityInput = document.getElementById("city_input").value
        cityName = cityInput
        city = "?q=" + cityName
        urlByCity = "https://api.openweathermap.org/data/2.5/weather" + city + apiKey + units
        document.getElementById("city_input").value = ""
    };

    function getRandomCityArray() {
        cityArray = [];

        for (var i=0; i < 200; i++) {
            num = Math.round(Math.random() * cities.length);
           
            if(cityArray.indexOf(cities[num]) === -1) {
                cityArray.push(cities[num])
            } else {
               i-- 
            };
        };

        return cityArray;
    }; 

    function getRandomBackground() {
        background = getRandomCityArray().join(" ❂ ");
        document.getElementById("left_side").innerHTML = "<p class=\"background\">" + background + "</p>";
        document.getElementById("right_side").innerHTML = "<p class=\"background\">" + background + "</p>";
    }

    
    getCoordinates();
    getRandomBackground();

    button.addEventListener("click", function(event) {
        event.preventDefault();
        getCity();
        getWeather("byCity");
        getRandomBackground();
        DOMContentJustLoaded = false;
    });
    

});

