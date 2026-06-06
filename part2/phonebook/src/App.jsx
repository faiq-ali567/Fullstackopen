import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

import phonebookService from './service/phonebookService'

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [keyword, setKeyword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    phonebookService
      .getAll()
      .then((response) => {
        setPersons(response.data)
        setErrorMessage('')
    })
    .catch(error => {
      setErrorMessage(error.response.data.error)
      setTimeout(() => {
        setErrorMessage('')
      }, 5000)
      console.log(error.response.data.error)
    })
  }, [])

  const findPerson = () => {
    return persons.find((person) => person.name === newName);
  }

  const handleUpdate = () => {
    const duplicatePerson = findPerson();
    if (!duplicatePerson) {
      return false;
    }

    if (duplicatePerson.number === newNumber) {
      alert('Phone number already added.');
      return true;
    }

    const wants = window.confirm(`${duplicatePerson.name} is already added to phonebook, replace the old number with a new one?`);

    if (wants) {
      const newPerson = {
        ...duplicatePerson,
        number: newNumber
      };

      phonebookService
        .update(duplicatePerson.id, newPerson)
        .then((response) => {
          const newPersons = persons.map((person) => {
            return person.name === duplicatePerson.name ? response.data : person;
          });
          setPersons(newPersons);
          setErrorMessage('')
        })
        .catch(error => {
          setErrorMessage(error.response.data.error)
          setTimeout(() => {
            setErrorMessage('')
          }, 5000)
          console.log(error.response.data.error)
        })
    }
    return true;
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if (handleUpdate()) {
      return
    }

    const newPerson = {
      name: newName,
      number: newNumber
    }

    phonebookService
      .create(newPerson)
      .then((response) => {
        const newPersons = [...persons, response.data]
        setPersons(newPersons)
        setErrorMessage('')
        setSuccessMessage(`Added ${newPerson.name}`)
        setTimeout(() => {
          setSuccessMessage('')
        }, 5000)
      })
      .catch(error => {
        setErrorMessage(error.response.data.error)
        setTimeout(() => {
          setErrorMessage('')
        }, 5000)
        console.log(error.response.data.error)
      })
  }

  const deletePerson = (id) => {
    const wants = window.confirm(`Are you sure you want to delete the person with id ${id}?`);

    if (wants) {
      phonebookService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
          setErrorMessage('');
        })
        .catch(error => {
          setErrorMessage(error.response.data.error)
          setTimeout(() => {
            setErrorMessage('')
          }, 5000)
          console.log(error.response.data.error)
        })
    }
  } 

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} isError={true}/>
      <Notification message={successMessage} isError={false} />
      <Filter setKeyword={setKeyword} keyword={keyword} />
      <h3>Add a new</h3>
      <PersonForm onSubmit={onSubmit} newName={newName} newNumber={newNumber} setNewName={setNewName} setNewNumber={setNewNumber} />
      <h2>Numbers</h2>
      <Persons persons={persons} keyword={keyword} deletePerson={deletePerson} />
    </div>
  )
}

export default App