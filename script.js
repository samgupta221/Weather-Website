//const apiKey = "974c42a437b8cbbcbae81bb5e92faa93";
//const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

//const searchBox = document.querySelector(".search input");
//const searchBtn = document.querySelector(".search button");

//async function checkWeather(city){
    //const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    //var data = await response.json();

    //console.log(data);

    //document.querySelector(".city").innerHTML = data.name;
    //document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    //document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    //document.querySelector(".wind space").innerHTML = data.wind.space;
//}

//searchBtn.addEventListener("click", ()=>{
     //checkWeather(searchBox.value);
//})

let weather = {
    "apiKey":"974c42a437b8cbbcbae81bb5e92faa93",
   fetchWeather: function (city) {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city
     + "&units=metric&appid="
     + this.apiKey
    )
    //.then((response) => response.json())
    //.then((data) => this.displayWeather(data));

    .then((response) => {
        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
   },
   displayWeather: function(data){
     const { name } = data;
     const { icon, description } = data.weather[0];
     const { temp, humidity } = data.main;
     const { speed } = data.wind;
     document.querySelector(".city").innerText = "Weather in " + name;
     document.querySelector(".icon").src = "https://openweathermap.org/img/wn/"+ icon + ".png";
     document.querySelector(".description").innerText = description;
     document.querySelector(".temp").innerText = temp + "°C";
     document.querySelector(".humidity").innerText =
       "Humidity: " + humidity + "%";
     document.querySelector(".wind").innerText =
       "Wind speed: " + speed + " km/h";
       document.querySelector(".weather").classList.remove("loading");
       document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + name + "')";
   },
   search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  }, 
};

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

weather.fetchWeather("Denver");