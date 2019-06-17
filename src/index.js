import 'bootstrap'
import './sass/main.scss'



const currentWheater = document.getElementById('current-wheater');
const forecast = document.getElementById('forecast');

// import projects from './data/projects.json'
// import experiments from './data/experiments.json'

var createNode = (element) => {return document.createElement(element)}
var appendNode = (parent, element) => {return parent.appendChild(element)}

var loadCards = (elem, cardContainer) =>{
  let experimentRow = 0;
  elem.map(function(elem) { // Map through the results and for each run the code below
    
    let col = createNode('div'), //  Create the elements we need
      card = createNode('div'),
      img = createNode('img'),
      desc = createNode('p'),
      linkedImg = createNode('a'),
      viewLive = createNode('span'),
      title = createNode('h2'),
      overlay = createNode('div'),
      stack = createNode('div')
      
    card.setAttribute('class', 'card') //  set attributes to the elements created
    overlay.setAttribute('class', 'description')
    title.setAttribute('class', 'title')
    img.src = elem.thumb
    img.setAttribute('alt', elem.name) 
    linkedImg.appendChild(img)
    linkedImg.setAttribute('href', elem.url)
    linkedImg.setAttribute('target', "_blank")
    title.innerHTML = `<a href="${elem.url}" target="_blank">${elem.name} </a>` 
    desc.innerHTML = elem.desc 
    viewLive.innerHTML = `<a href="${elem.url}" target="_blank">View Live </a>` 
    img.innerHTML = `<a href="${elem.url}" target="_blank">${img} </a>` 


    if((experimentRow==0)||(experimentRow==3)){ // create the grid according to index
      col.setAttribute('class', 'col-md-12 col-xs-12')
    }
    else{
      col.setAttribute('class', 'col-md-6 col-xs-12')
    }

    appendNode(overlay, desc)
    appendNode(overlay, loadTech(elem.stack))
    appendNode(overlay, viewLive)
    appendNode(card, title) //  Attach element to the card
    appendNode(card, linkedImg)
    appendNode(card, overlay)
    appendNode(col, card)
    experimentRow++
    return appendNode(cardContainer, col)
  })
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

$('.dropdown-toggle').dropdown()



  // $("#submit").on('click',function(){
  //     let $inputValue = $("#inputVal").val();
  //     let $myKey = "&units=metric&APPID=d6ac9a8b8d7c463ad353c08b092e0cd9";
  //     let $myPoint = "https://api.openweathermap.org/data/2.5/weather?q="+$inputValue+$myKey;
  //     if($inputValue!= ''){
  //         $.get($myPoint, function (data,status) {
          
  //             let widget = show(data);
  //             $("#show").html(widget);
              
  //             // $("#inputVal").val('');
  //         })
  //     }else{
  //         $("#show").html("<h1>Put the name of the region, this is a error!! Alert! Alert!</h1>");
  //     }
  // });

  // function show(data){
  //   return "<h2>"+data.name+"</h2>" +
  //   "<h3><strong>Weather</strong> : "+ data.weather[0].main+"</h3>" +
  //   "<h3><strong>Weather</strong> : "+ data.weather[0].description+"</h3>" +
  //   "<h3><strong>Temp</strong> : "+ data.main.temp+"</h3>" +
  //   "<h3><strong>Humidity</strong> : "+ data.main.humidity+"</h3>" 
  // }
