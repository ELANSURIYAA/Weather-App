var input = document.getElementById("ibox");
input.addEventListener("keyup",(e)=>{
    if(e.key=="Enter" && input.value!=null){
        getweather(input.value);
        input.value="";
    }
})
function getweather(city){
    var url = "http://api.openweathermap.org/geo/1.0/direct?q="+city+",IN&limit=5&appid=b190a0605344cc4f3af08d0dd473dd25";
    fetch(url)
    .then(response => { 
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
         updateweather(data[0].lat,data[0].lon);
    })
    .catch(error => {
        console.error('Error during fetch:', error.message);
    }); 
}

function updateimg(id){
    var img = document.querySelector("img");
    if(id<300){
        img.setAttribute("src","./images/thunder.svg");
    }else if(id<400){
        img.setAttribute("src","./images/rainy-2.svg");
    }else if(id<600){
        img.setAttribute("src","./images/rainy-7.svg");
    }else if(id<700){
        img.setAttribute("src","./images/snowy-1.svg");
    }else if(id<800){
        img.setAttribute("src","./images/cloudy.svg");
    }else if(id==800){
        img.setAttribute("src","./images/day.svg");
    }else{
        img.setAttribute("src","./images/cloudy.svg");
    }
}
function updateweather(lat,lon){
    var APIUrl ="https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid=b190a0605344cc4f3af08d0dd473dd25";
    fetch(APIUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        var c = document.getElementById("celsius");
        if(c.checked==1){
            var temp = document.getElementById("temperature");
            var location = document.getElementById("city-name");
            temp.innerHTML = Math.round(data.main.temp-273.15)+"<sup>O</sup>C";
            location.innerHTML = data.name;
            var p = document.getElementById("weather-name");
            p.innerHTML = data.weather[0].description;
            updateimg(data.weather[0].id);
        }else{
            var val = (data.main.temp-273.15)*5/9+32;
            var temp = document.getElementById("temperature");
            var location = document.getElementById("city-name");
            temp.innerHTML = Math.round(val)+"<sup>O</sup>F";
            location.innerHTML = data.name;
            var p = document.getElementById("weather-name");
            p.innerHTML = data.weather[0].description;
            updateimg(data.weather[0].id);
        }
    })
    .catch(error => {
        console.error('Error during fetch:', error.message);
    }); 
  }
function showPosition(position) {
    var lat =  position.coords.latitude;   
    var long = position.coords.longitude;
    updateweather(lat,long);
    
  }
function getcurrent(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      }
}
var btn = document.querySelector("button");
btn.addEventListener("click",getcurrent);
window.onload = getcurrent;
