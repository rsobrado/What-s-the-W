import 'bootstrap'
import './sass/main.scss'


const weatherContainer = document.getElementById('current-weather')
const forecastContainer = document.getElementById('forecast')



// import projects from './data/projects.json'
// import experiments from './data/experiments.json'
import weather1 from './data/weather.json'
var weather =  []


var createNode = (element) => {return document.createElement(element)}
var appendNode = (parent, element) => {return parent.appendChild(element)}

var loadWeather = (data) =>{
  let inputCity = $('#inputCity').val()
  if(inputCity!= ''){
    const myKey = "&units=metric&APPID=d6ac9a8b8d7c463ad353c08b092e0cd9"
    var myPoint = "https://api.openweathermap.org/data/2.5/forecast?q="+inputCity+myKey
    
  
    $.get(myPoint, function (data,status) {   
      weather[0] = data
    })
    
    data.map(function(data) { // Map through the results and for each run the code below
      let weather = data.list[0].weather[0].main,
          temp = data.list[0].main.temp,
          humidity = data.list[0].main.humidity
  
      currentWeather(weather,temp)
      forecastContainer.innerHTML = ''
      
      for(var i = 1; i < 5; i++){//print the next 4 days forecast
        let weather = data.list[i].weather[0].main, //reset the values for next day
        temp = data.list[i].main.temp,
        humidity = data.list[i].main.humidity
        forecast(weather,temp,humidity,i)
      }
    })
  }else{
      $("#show").html("<h1>Alert! Alert!</h1>");
  }

}

var currentWeather = (weather,temp) =>{
  let weatherC = createNode('h1'),
      tempC = createNode('h2'),
      icon = createNode('i')
      
  weatherContainer.innerHTML = ''
  tempC.setAttribute('class','temp')
  tempC.innerHTML = temp + '°'
  weatherC.innerHTML = weather
  switch(weather){
    case 'Clear':
      icon.setAttribute('class', 'weather-icon fas fa-sun')
      break
    case 'Snow':
      icon.setAttribute('class', 'weather-icon fas fa-snowflake')
      break
    case 'Rain':
      icon.setAttribute('class', 'weather-icon fas fa-cloud-sun-rain')
    case 'Heavy':
      icon.setAttribute('class', 'weather-icon fas fas fa-cloud-showers-heavy')
      break
  }

  appendNode(weatherContainer, weatherC)
  appendNode(weatherContainer, tempC)
  appendNode(weatherContainer, icon)

}

var forecast = (weather,temp,humidity,day) =>{
  let forecastDay = createNode('div'),
      tempC = createNode('h5'),
      weatherC = createNode('h5'),
      humidityC = createNode('h5'),
      icon = createNode('i'),
      dayC = createNode('h4')

  switch(weather){
    case 'Clear':
      icon.setAttribute('class', 'fas fa-sun')
      break
    case 'Snow':
      icon.setAttribute('class', 'fas fa-snowflake')
      break
    case 'Rain':
      icon.setAttribute('class', 'fas fa-cloud-sun-rain')
      break
    case 'Heavy':
      icon.setAttribute('class', 'fas fa-cloud-showers-heavy')
      break
  }
      
  forecastDay.setAttribute('class','forecast-container')
  tempC.setAttribute('class','temp')
  humidityC.setAttribute('class','hum')
  dayC.innerHTML = today(day)
  weatherC.innerHTML = weather
  tempC.innerHTML = `<i class="fas fa-thermometer-full"></i>${temp}°`
  humidityC.innerHTML = `<i class="fas fa-tint"></i>${humidity}%`
  appendNode(forecastDay, dayC)
  appendNode(forecastDay, weatherC)
  appendNode(forecastDay, icon)
  appendNode(forecastDay, tempC)
  appendNode(forecastDay, humidityC)
  appendNode(forecastContainer, forecastDay)

}

$("#submit").on('click',function(){
  loadWeather(weather);
});

$('input[type=text]').on('keydown', function(e) {
  if (e.which == 13) {
      e.preventDefault();
      loadWeather(weather);
  }
});

var today = (next) => { //function to get current day
  let getWeekDay = (date) => {
    let weekdays = new Array("SUN", "MON", "TUE", "WED", "THR", "FRI", "SAT"),
      day = date.getDay()
      if((day+next) >= 7){return weekdays[(day+(next-1))-6]}
      return weekdays[day+next]
  },
  date =  new Date(),
          weekDay = getWeekDay(date)
  return weekDay;
}
