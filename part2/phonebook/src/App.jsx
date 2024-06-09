import { useState, useEffect } from 'react'
import phonebookService from './services/phonebook'

const Filter = ({ filter, handleFilterChange }) => {
  return (
    <div>
      filter shown with: <input value={filter} onChange={handleFilterChange} />
    </div>
  )
}

const PersonForm = ({ addPerson, newName, handleNameChange, newNumber, handleNumberChange}) => {
  return (
    <form onSubmit={addPerson}>
    <div>
      name: <input value={newName} onChange={handleNameChange} />
    </div>
    <div>
      number: <input value={newNumber} onChange={handleNumberChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}

const Persons = ({ persons, deletePerson }) => {
  return (
    <div>
      {persons.map(person => <Person key={person.name} person={person} deletePerson={deletePerson} />)}
    </div>
  )
}

const Person = ({ person, deletePerson }) => {
  return (
    <div>{person.name} {person.number} <button onClick={() => deletePerson(person.id)}>delete</button> </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [filter, setFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  useEffect(() => {
    phonebookService
      .getAll()
      .then(data => {
        setPersons(data) 
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
      phonebookService
        .create(newPerson)
        .then(data => {
          setPersons(persons.concat(data))
        })
    }

    setNewName('')
    setNewNumber('')
  }

  const deletePerson = (id) => {
    console.log(`id ${id}`);
    const existingPerson = persons.find((p) => p.id === id)
    if (window.confirm(`Delete ${existingPerson.name}?`)) {
      phonebookService
        .remove(id)
        .catch(error => {
          console.log(error);
          alert(`Failed to delete ${existingPerson.name}`)
        })
      setPersons(persons.filter((person) => person.id !== id))
    }
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
      <Persons persons={personsToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App