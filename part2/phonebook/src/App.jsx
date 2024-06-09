import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = (props) => {
  return (
    <div>
      filter shown with: <input value={props.filter} onChange={props.handleFilterChange} />
    </div>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addPerson}>
    <div>
      name: <input value={props.newName} onChange={props.handleNameChange} />
    </div>
    <div>
      number: <input value={props.newNumber} onChange={props.handleNumberChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}

const Persons = ({persons}) => {
  return (
    <div>
      {persons.map(person => <Person key={person.name} person={person} />)}
    </div>
  )
}

const Person = ({person}) => {
  return (
    <div>{person.name} {person.number}</div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [filter, setFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data) 
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const existingPerson = persons.find((p) => p.name === newName)
    if (existingPerson) {
      alert(`${newName} has already been added to the phonebook`)
    } else {
      const newPerson = {
        name: newName,
        number: newNumber
      }
      axios
        .post('http://localhost:3001/persons', newPerson)
        .then(response => {
          setPersons(persons.concat(response.data))
        })
    }

    setNewName('')
    setNewNumber('')
  }

  const personsToShow = persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()))

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>New entry</h2>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} />
    </div>
  )
}

export default App