import React, {useState} from 'react'


function App() {
  const [query, setQuery] = useState('')
  const [weather, setWeather] = useState({})
  // fetch('https://api.openweathermap.org/data/2.5/weather?q=Liverpool,uk&APPID=f5745c022464cbacda7616c373cea3fe')
  // .then(response => response.json())
  // .then(data => console.log(data));

  const search = evt => {
    if (evt.key === 'Enter') {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&APPID=f5745c022464cbacda7616c373cea3fe`)
      .then(response => response.json())
      .then(data => {
        setWeather(data)
        setQuery('')
        console.log(data)
      })
    }
  }
  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    
    let day = days[d.getDay()]
    let date = d.getDate()
    let month = months[d.getMonth()]
    let year = d.getFullYear()
    
    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
      <main>
        <div className="search-box">
          <input 
            type="text" className="search-bar" 
            placeholder="Search here" 
            onChange={e => setQuery(e.target.value)}
            onKeyPress={search}
            value={query}
          />
        </div>
        {typeof weather.main !== "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}°C</div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
