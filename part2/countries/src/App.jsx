import { useState, useEffect } from 'react'
import countriesService from './services/countries'
import weatherService from './services/weather'

const Filter = ({ filter, handleFilterChange }) => {
  return (
    <div>
      find countries: <input value={filter} onChange={handleFilterChange} />
    </div>
  )
}

const Country = ({country}) => {
  const lat = country.capitalInfo.latlng[0]
  const lng = country.capitalInfo.latlng[1]
  const [temp, setTemp] = useState(0)
  const [weatherType, setWeatherType] = useState('')
  const [weatherIcon, setWeatherIcon] = useState('')
  const [windSpeed, setWindSpeed] = useState(0)

  useEffect(() => {
    weatherService
      .getWeather(lat, lng)
      .then(data => {
        setTemp(data.main.temp)
        setWeatherType(data.weather[0].description)
        setWeatherIcon('https://openweathermap.org/img/wn/' + data.weather[0].icon + '@4x.png')
        setWindSpeed(data.wind.speed)
      })
      .catch(error => {
        console.log(error);
      })
  })

  return (
    <div>
      <h2>{country.name.common}</h2>
      <div>capital: {country.capital}</div>
      <div>area: {country.area}</div>
      <h3>languages</h3>
      <ul>
        {Object.values(country.languages).map((value, index) => (
          <li key={index}>{value}</li>
        ))}
      </ul>
      <div><img src={country.flags.png} /></div>
      <h3>Weather in {country.capital}</h3>
      <div>Current conditions: {weatherType}</div>
      <div><img src={weatherIcon} /></div>
      <div>Temperature: {temp}ºC</div>
      <div>Wind speed: {windSpeed} km/h</div>
    </div>
  )
}

const CountryList = ({countries, setFilter}) => {
  return (
    <ul>
      {countries.map((country, index) =>
        <li key={index}>
          {country.name.common} <button onClick={() => {setFilter(country.name.common)}}>show</button>
        </li>)}
    </ul>
  )
}

const CountryDetails = ({countries, setFilter}) => {
  if (countries.length === 1) {
    return (
      <Country country={countries[0]} />
    )
  } else if (countries.length <= 10) {
    return (
      <CountryList countries={countries} setFilter={setFilter} />
    )
  } else {
    return (
      <p>Too many matches, please specify a filter above.</p>
    )
  }
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    countriesService
      .getAll()
      .then(data => {
        setCountries(data)
      })
      .catch(error => {
        console.log(error);
      })
  }, [])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const countriesFiltered = countries.filter((country) => country.name.common.toLowerCase().includes(filter.toLowerCase()))
  
  return (
    <>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <CountryDetails countries={countriesFiltered} setFilter={setFilter} />
    </>
  )
}

export default App
