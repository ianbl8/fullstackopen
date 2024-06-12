import { useState, useEffect } from 'react'
import countriesService from './services/countries'

const Filter = ({ filter, handleFilterChange }) => {
  return (
    <div>
      find countries: <input value={filter} onChange={handleFilterChange} />
    </div>
  )
}

const CountryDetails = ({countries}) => {
  if (countries.length === 1) {
    const country = countries[0]
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
      </div>
    )
  } else if (countries.length <= 10) {
    return (
      <ul>
        {countries.map((country, index) =>
          <li key={index}>
            {country.name.common}
          </li>)}
      </ul>
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
  })

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const countriesFiltered = countries.filter((country) => country.name.common.toLowerCase().includes(filter.toLowerCase()))
  
  return (
    <>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <CountryDetails countries={countriesFiltered} />
    </>
  )
}

export default App
