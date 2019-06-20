import 'bootstrap'
import './sass/main.scss'



const containertWeather = document.getElementById('current-weather');
const forecast = document.getElementById('forecast');

// import projects from './data/projects.json'
// import experiments from './data/experiments.json'
import weather from './data/weather.json'


var createNode = (element) => {return document.createElement(element)}
var appendNode = (parent, element) => {return parent.appendChild(element)}

var loadCards = (data) =>{
  let experimentRow = 0
  data.map(function(data) { // Map through the results and for each run the code below
    // experimentRow++
    // return appendNode(cardContainer, col)
    let weather = data.list[0].weather[0].main,
        temp = data.list[0].main.temp

    console.log(data.city.name)
    console.log(data.city.country)
    console.log(data.list[0].weather[0].main)
    console.log(data.list[0].main.temp)
    console.log(data.list[0].main.humidity)
    currentWeather(weather,temp)
  })
}

var currentWeather = (weather,temp) =>{
  let weatherC = createNode('h1'),
      tempC = createNode('h2'),
      icon = createNode('i')
      
    containertWeather.innerHTML = ''
    weatherC.innerHTML = weather
    tempC.setAttribute('class','temp')
    tempC.innerHTML = temp + '°'
    switch(weather){
      case 'Clear':
        icon.setAttribute('class', 'weather-icon fas fa-sun')
        break
      case 'Snow':
        icon.setAttribute('class', 'weather-icon fas fa-snowflake')
        break
    }

    appendNode(containertWeather, weatherC)
    appendNode(containertWeather, tempC)
    appendNode(containertWeather, icon)
    // console.log(weatherC)

}

var loadTech = (stack) => {
  let i = 0,
    tech = createNode('div')
  
  tech.setAttribute('class', 'techStack') 
  
  for(i = 0; i < stack.length; i++){
    tech.innerHTML +=  `<span class="badge badge-info">${stack[i]} </span>` 
  }
  return tech
}

// loadCards(projects, projectsContainer);
// loadCards(experiments, experimentsContainer);

// $('.dropdown-toggle').dropdown()



  $("#submit").on('click',function(){
    loadCards(weather);
      // let $inputValue = $("#inputVal").val();
      // let $myKey = "&units=metric&APPID=d6ac9a8b8d7c463ad353c08b092e0cd9";
      // let $myPoint = "https://api.openweathermap.org/data/2.5/weather?q="+$inputValue+$myKey;
      // if($inputValue!= ''){
      //     $.get($myPoint, function (data,status) {
          
      //         let widget = show(data);
      //         $("#show").html(widget);
              
      //         // $("#inputVal").val('');
      //     })
      // }else{
      //     $("#show").html("<h1>Put the name of the region, this is a error!! Alert! Alert!</h1>");
      // }
  });

  $('input[type=text]').on('keydown', function(e) {
    if (e.which == 13) {
        e.preventDefault();
        loadCards(weather);
    }
});

var today = () => { //function to get current day
  let getWeekDay = (date) => {
    let weekdays = new Array("SUN", "MON", "TUE", "WED", "THR", "FRI", "SAT"),
      day = date.getDay()
      return weekdays[day]
  },
  date = new Date(),
      weekDay = getWeekDay(date)
      
  console.log( weekDay);
}