const cityInput=document.querySelector("#cityInput");
const searchBtn=document.querySelector("#searchBtn");
const loading=document.querySelector("#loading");
const error=document.querySelector("#error");
const weatherCard=document.querySelector("#weatherCard");
const searchBox=document.querySelector(".search-box");
const cityName = document.querySelector("#cityName");
const temperature = document.querySelector("#temperature");
const conditionElement = document.querySelector("#condition");
const humidityElement = document.querySelector("#humidity");
const windSpeedElement = document.querySelector("#windSpeed");
const resetBtn=document.querySelector("#resetBtn");
searchBtn.addEventListener("click",async ()=>{ 
   loading.classList.remove("hidden");
   const city = cityInput.value.trim();

  if (city.trim() === "") {
    error.innerText = "Enter City Name First";
    error.classList.remove("hidden");
    return;
}
try{const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}`;
const response=await fetch(url);
const data=await response.json();
if(!data.results||data.results.length==0){
    error.innerText="Enter Valid City";
    error.classList.remove("hidden");
    return;
}
const location=data.results[0];

const name=location.name;
const latitude=location.latitude;
const longitude=location.longitude;



const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`;
const wresponse=await fetch(weatherUrl);
const wdata=await wresponse.json();
console.log(wdata);
const temp=wdata.current.temperature_2m;
const humidity=wdata.current.relative_humidity_2m;
const windSpeed=wdata.current.wind_speed_10m;
const weatherCode=wdata.current.weather_code;
const condition=getWeatherCondition(weatherCode);
cityName.innerText =location.name;
temperature.innerText = temp;
conditionElement.innerText = condition;
humidityElement.innerText = `${humidity}%`;
windSpeedElement.innerText = `${windSpeed} km/h`;
weatherCard.classList.remove("hidden");
loading.classList.add("hidden");}
catch(err){
    loading.classList.add("hidden");
    error.innerText = "Something went wrong. Please try again.";
    error.classList.remove("hidden");
}
});

resetBtn.addEventListener("click", () => {
    cityInput.value="";
    weatherCard.classList.add("hidden");
    
     error.innerText = "";
     error.classList.add("hidden");
});

function getWeatherCondition(code){
    if(code===0){
        return "Clear sky";
    }
    else if(code===1||code===2||code===3){
        return "Cloudy";
    }
    else if(code===61||code===62||code===63){
        return "Rain";

    }
    else return "UNKNOWN";
}

