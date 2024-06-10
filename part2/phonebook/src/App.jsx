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

const Notification = ({ message }) => {
  if (!message) {
    return null
  }

  return (
    <div className='message'>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [filter, setFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    phonebookService
      .getAll()
      .then(data => {
        setPersons(data) 
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }

    const existingPerson = persons.find((p) => p.name === newName)
    if (existingPerson) {
      if (window.confirm(`${newName} is already in the phonebook.\nUpdate their number to ${newNumber}?`)) {
        phonebookService
          .update(existingPerson.id, newPerson)
          .then(data => {
            setPersons(persons.map(person => person.id !== existingPerson.id ? person : data))
            setMessage(`The entry for ${existingPerson.name} has been updated`)
            setTimeout(() => {
              setMessage(null)
            }, 3000)
          })
          .catch(error => {
            console.log(error);
            alert(`Failed to update ${existingPerson.name}`)
          })
        }
    } else {
      phonebookService
        .create(newPerson)
        .then(data => {
          setPersons(persons.concat(data))
          setMessage(`${newPerson.name} has been added to the phonebook`)
          setTimeout(() => {
            setMessage(null)
          }, 3000)
      })
        .catch(error => {
          console.log(error);
          alert(`Failed to add ${newPerson.name}`)
        })

    }

    setNewName('')
    setNewNumber('')
  }

  const deletePerson = (id) => {
    const existingPerson = persons.find((p) => p.id === id)
    if (window.confirm(`Delete ${existingPerson.name}?`)) {
      phonebookService
        .remove(id)
        .then(() => {
          setMessage(`The entry for ${existingPerson.name} has been deleted`)
          setTimeout(() => {
            setMessage(null)
          }, 3000)

        })
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
      <h1>Phonebook</h1>
      <Notification message={message} />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>New entry</h2>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App