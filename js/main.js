// Navbar ===========================================================
$("nav .nav-toggle").on("click", function () {
  $(".list-anchor").slideToggle(500);
});
$(".list-anchor").click(function (e) {
  $(".cursor-pointer").removeClass("active");
  $(e.target).addClass("active");
});

// Navbar ===========================================================

// get current location

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function (pos) {
    let latitude = pos.coords.latitude;
    let longitude = pos.coords.longitude;
    getWeatherData(`${latitude},${longitude}`);
    // console.log();
    // console.log(pos.coords.longitude);
  });
}
else {
  alert('Open your location')
}

// fetch data

async function getWeatherData(myLocation) {
  const response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=8c3e231ee78246f5a96210446240707&q=${myLocation}&days=3&aqi=no&alerts=no`
  );
  const data = await response.json();
  getDateWeather(data);
  displayWeather(data);
  console.log(data); 
}
// search box====================

const searchBox = $(".searchBox");
// console.log(searchBox);
$(searchBox).on("input", function (e) {
  console.log(this.value);
  getWeatherData(this.value);
});

// display Data

let myCards = document.querySelector(".my-content");
let package = "";
function displayWeather(data) {
  // console.log(data);
  // console.log(data.current.condition.icon);
  package = `<div class=" bg-gray-700 mt-5 rounded-lg lg:flex">

          <div class="pb-4 text-white bg-mybg bg-opacity-70 lg:p-0 lg:w-1/3 lg:pb-5 ">
            <div class="flex w-full justify-between text-gray-400 py-2 px-3 bg-gray-700  ">
              <p>${currentday}</p>
              <p>${myMounth}</p>
            </div>
            <h2 class="text-gray-400 ml-3 mt-5">${data.location.name}</h2>
            <p class="text-8xl lg:text-9xl ml-3">${data.current.temp_c}</p>
            <img src="https:${data.current.condition.icon}" class="ml-4" alt="weather">
            <p class="mt-4 font-thin text-main ml-3 lg:mb-4">${data.current.condition.text}</p>
            <div class="flex text-gray-400 gap-6 ml-3">
              <div>
                <img src="./images/icon-umberella.png" class="inline" alt="Weather" />
                <span>${data.current.windchill_c}%</span>
              </div>
              <div>
                <img src="./images/icon-wind.png" class="inline" alt="Weather" />
                <span>${data.current.vis_km}Km/h</span>
              </div>
              <div>
                <img src="./images/icon-compass.png" class="inline" alt="Weather" />
                <span>${data.current.wind_dir}</span>
              </div>
            </div>
          </div>
        
        <div class="text-center lg:w-1/3">
          <h2 class="bg-gray-600 text-gray-300 py-2">${nextday}</h2>
          <img src="https:${data.forecast.forecastday[1].day.condition.icon}" class="mx-auto mt-5" alt="weather">
          <h3 class="text-[20px] text-white my-3">${data.forecast.forecastday[1].day.maxtemp_c}</h3>
          <h4 class="text-gray-300">${data.forecast.forecastday[1].day.mintemp_c}</h4>
          <p class="text-main mt-2">${data.forecast.forecastday[1].day.condition.text}</p>
        </div>

        <div class="text-center mt-3 lg:m-0 bg-mybg bg-opacity-70 lg:w-1/3">
          <h2 class="bg-gray-700 text-gray-300 py-2">${thirdday}</h2>
          <img src="https:${data.forecast.forecastday[2].day.condition.icon}" class="mx-auto mt-5" alt="weather">
          <h3 class="text-[20px] text-white my-3">${data.forecast.forecastday[2].day.maxtemp_c}</h3>
          <h4 class="text-gray-300">${data.forecast.forecastday[2].day.mintemp_c}</h4>
          <p class="text-main mt-2">${data.forecast.forecastday[2].day.condition.text}</p>
        </div>
      </div>`;

  myCards.innerHTML = package;
}

// get Date

let myMounth;
let currentday;
let nextday;
let thirdday;

function getDateWeather(data) {
  let mydate = new Date(data.forecast.forecastday[0].date);
  // console.log(data.forecast.forecastday[0].date);
  let mounths = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  myMounth = mydate.getMonth() +" "+  mounths[mydate.getMonth()]  ;
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  // console.log(mydate.getDay());
  currentday = days[mydate.getDay()];
  if(mydate.getDay()==6){
    nextday = days[1];
    thirdday = days[2];
  }
  else{
    nextday = days[mydate.getDay()+1];
    thirdday = days[mydate.getDay()+2];
  }
}
