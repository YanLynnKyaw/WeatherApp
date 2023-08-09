const apiKey ='1bad071bc5e8bbeed499ec8586bd81ad';
const locBtn = document.querySelector('.loc-btn');
const tdyInfo = document.querySelector('.tdy-info');
const tdyWIcon = document.querySelector('.tdy-weather i');
const tdyTemp = document.querySelector('.weather-temp');
const daysList = document.querySelector('.day-list');

const weatherIconMap = {
    '01d': 'sun',
    '01n': 'moon',
    '02d': 'sun',
    '02n': 'moon',
    '03d': 'cloud',
    '03n': 'cloud',
    '04d': 'cloud',
    '04n': 'cloud',
    '05d': 'sun',
    '05n': 'sun',
    '06d': 'sun',
    '06n': 'sun',
    '07d': 'sun',
    '07n': 'sun',
    '08n': 'sun',
    '08d': 'sun',
    '09n': 'cloud-rain',
    '09d': 'cloud-rain',
    '10n': 'cloud-rain',
    '10n': 'cloud-rain',
    '11d': 'cloud-lightning',
    '11n': 'cloud-lightning',
    '12d': 'sun',
    '12n': 'sun',
    '13d': 'cloud-snow',
    '13n': 'cloud-snow',
    '50d': 'water',
    '50n': 'water',
};

function fetchWeatherData(location){
    console.log(location, apiKey);
    const apiUrl =`https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=metric`;
    console.log(apiUrl);
    fetch(apiUrl).then(response => response.json()).then
    (data =>{
            const tdyWeather = data.list[0].weather[0].description;
            const tdyTmp = `${Math.round(data.list[0].main.temp)}°C`;
            const tdyWIconCode = data.list[0].weather[0].icon;

            tdyInfo.querySelector('h2').textContent = new Date().toLocaleDateString('en',{weekday:'long'});
            tdyInfo.querySelector('span').textContent = new Date().toDateString('en', {year:'numeric',month:'long', day:'numeric'});
            tdyWIcon.className = `bx bx-${weatherIconMap[tdyWIconCode]}`;
            tdyTemp.textContent = tdyTmp;


            const locationElement = document.querySelector('#tdy');
            console.log(document.querySelector('#tdy'));
            locationElement.textContent = `${data.city.name}, ${data.city.country}`;

            const weatherDescription = document.querySelector('#tdyW');
            console.log(document.querySelector('#tdyW'));
            weatherDescription.textContent = tdyWeather;

            const tdyPreci = `${data.list[0].pop}%`;
            const tdyHumi = `${data.list[0].main.humidity}%`;
            const tdyWind = `${data.list[0].wind.speed}km/h`;

            const dayInfoContainer = document.querySelector('.day-info');
            dayInfoContainer.innerHTML = ` 
            
                <div>
                    <span class="title">PERCITITATION</span>
                    <span class="value">${tdyPreci}</span>
                </div>

                <div>
                    <span class="title">HUMIDITY</span>
                    <span class="value">${tdyHumi}</span>
                </div>

                <div>
                    <span class="title">WINDSPEED</span>
                    <span class="value">${tdyWind}</span>
                </div>

            `;

            const today = new Date();
            const nextDaysData = data.list.slice(1);

            const uniqueDays = new Set();
            let count = 0;
            daysList.innerHTML = '';
            for(const dayData of nextDaysData){
                const forecastDate = new Date(dayData.dt_txt);
                const dayAbbreviation =  forecastDate.toLocaleDateString('en', {weekday:'short'});
                const dayTemp = `${Math.round(dayData.main.temp)}°C`;
                const IconCode = dayData.weather[0].icon;

                if(!uniqueDays.has(dayAbbreviation)&& forecastDate.getDate() !== today.getDate()){
                    uniqueDays.add(dayAbbreviation);
                    daysList.innerHTML += `
                    
                        <li>
                            <i class='bx bx-${weatherIconMap[IconCode]}'></i>
                            <span>${dayAbbreviation}</span>
                            <span class="day-tmp">${dayTemp}</span>
                        </li>

                    `;
                    count++;
                }

                if (count === 4) break;

                 }

            }

    ).catch(error =>{
        alert(`Error Fetching Weather Data:${error}( API Error)`);
    });;
}

document.addEventListener('DOMContentLoaded',() =>{
    const defaultLocation = 'Yangon';
    fetchWeatherData(defaultLocation);
});

locBtn.addEventListener('click',()=>{
    const location = prompt('Enter a Location:');
    if (!location) return;

    fetchWeatherData(location);
});