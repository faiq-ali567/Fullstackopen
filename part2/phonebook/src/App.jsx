import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'

import phonebookService from './service/phonebookService'

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [keyword, setKeyword] = useState('')

  useEffect(() => {
    phonebookService
      .getAll()
      .then((response) => {
        setPersons(response.data)
      })
  }, [persons])

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
        });
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
      })
  }

  const deletePerson = (id) => {
    const wants = window.confirm(`Are you sure you want to delete the person with id ${id}?`);

    if (wants) {
      phonebookService
        .deletePerson(id)
        .then((response) => {
          setPersons(persons.filter((person) => person.id !== id));
        });
    }
  } 

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter setKeyword={setKeyword} keyword={keyword} />
      <h3>Add a new</h3>
      <PersonForm onSubmit={onSubmit} newName={newName} newNumber={newNumber} setNewName={setNewName} setNewNumber={setNewNumber} />
      <h2>Numbers</h2>
      <Persons persons={persons} keyword={keyword} deletePerson={deletePerson} />
    </div>
  )
}

export default App