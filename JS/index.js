let locationInput = document.getElementById('locationInput')
let data
async function getWeather(searchCountry = 'Egypt') {
    let request = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=98e3e1ed9ff549a8b45173005240201&q=${searchCountry}&days=3`)
    data = await request.json()
    display()
}

function getDayName(date = new Date(), locale = 'en-US') {
    return date.toLocaleDateString(locale, { weekday: 'long' });
}

function getmonthName(date = new Date(), locale = 'en-US') {
    return date.toLocaleDateString(locale, { month: 'long' });
}

function display() {
    temp = ' '

    current = 
        ` 
            <div class="card text-center bg-transparent border-0 w-75 mx-auto text-white my-5 py-5">
            <div class="date w-100 d-flex justify-content-between">
                <h6 class="w-50 h6">${getDayName(new Date(data.forecast.forecastday[0].date))}</h6>
                <p class="w-50">${data.forecast.forecastday[0].date[8]+ data.forecast.forecastday[0].date[9] +' '+getmonthName(new Date(data.forecast.forecastday[0].date))}</p>
            </div>
            <div class= "d-flex flex-wrap gap-2">
            <div class="d-flex w-100 justify-content-center"><img src="${data.current.condition.icon}" class="w-25"></div>
            <h3 class="w-100 h3">${data.current.temp_c}°C</h3>
            <small class="fw-bold w-100 ">${data.current.condition.text}</small>
            <p class="w-100">${data.location.name}</p>
            </div>
            <div class="d-flex justify-content-around mt-3">
               <div><i class="fa-solid fa-wind"></i> <p> ${data.current.wind_kph}</p></div>
               <div><i class="fa-solid fa-compass"></i> <p> ${data.current.wind_dir}</p></div>
               <div><i class="fa-solid fa-sun"></i> <p> ${data.current.uv}</p></div>
              </div>
        </div>`

    for (var i = 1; i < data.forecast.forecastday.length; i++) {
        temp += 
        `
        <div class="w-100 bg-black d-flex justify-content-around text-white py-3 my-4 rounded-3 flex-wrap px-2">
            <p class = "w-100 text-center">${getDayName(new Date(data.forecast.forecastday[i].date))}</p>
            <div class="w-25"><img src="${data.forecast.forecastday[i].day.condition.icon}" class="w-100"></div>
            <div class="w-50 my-2 text-center">
            <h3 class="h3">${data.forecast.forecastday[i].day.maxtemp_c} °C</h3>
            <h6 class="h6">${data.forecast.forecastday[i].day.mintemp_c} °C</h6>
            <small class="fw-bold">${data.forecast.forecastday[i].day.condition.text}</small>
            </div>
        </div>`
        
    }
    document.getElementById('forecastCards').innerHTML =temp
    document.getElementById('current-card').innerHTML =current
} 

getWeather()
locationInput.addEventListener('keyup' , function(){
      getWeather(locationInput.value)
})
