import React, { useState, useEffect } from 'react'
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Number from "./components/Number";
import personService from "./services/Persons"
import Notification from "./components/Notification";

const App = () => {
    const [persons, setPersons] = useState([
    ])
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [ filter, setNewFilter ] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)


    useEffect(() => {
        // console.log('effect')
        personService
            .getAll()
            .then(initialPersons => {
                setPersons(initialPersons)
            })
    }, [])
    // console.log('render', persons.length, 'persons')

    const filterPerson = persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()))

    const handleNameChange = (event) =>{
        setNewName(event.target.value)
    }

    const handlePhoneChange = (event) =>{
        setNewNumber(event.target.value)
    }

    const handleFilterChange = (event) => {
        setNewFilter(event.target.value)
    }

    const handleDeletePerson = (event) => {
        const pid = event.target.dataset.id
        // console.log("id:",pid)
        // const id = parseFloat(pid)p
        console.log(pid)

        const person = persons.find(p => p.id===pid);
        // const person =

        console.log("person:", person)

        const result = window.confirm(`Delete ${person.name}?`)
        if (result){
            deletePerson(pid)
            // alert(`${person.name} is deleted`)
            setErrorMessage(
                `${person.name} is deleted`
            )
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    const addPerson = (event) => {
        event.preventDefault()
        const personObj = {
            name : newName,
            number: newNumber
        }
        // console.log(persons.find((person) => person.name === newName))
        const personExist = persons.find((person) => person.name === newName)
        if (personExist){
            // console.log(`${newName} is already added to phonebook`)
            // alert(`${newName} is already added to phonebook`)
            const result = window.confirm(`${personExist.name} is already added to phonebook, replace the old number with a new one?`)
            if (result){
                personService
                    .updatePerson(personExist.id,personObj)
                    .then(returnedPerson => {
                        setPersons(persons.map(person => person.id !==personExist.id ? person : returnedPerson))
                    })
                    .catch(error => {
                        // alert(
                        //     `the note '${personExist.name}' was already deleted from server`
                        // )
                        setErrorMessage(
                            `the person '${personExist.name}' was already deleted from server`
                        )
                        setTimeout(() => {
                            setErrorMessage(null)
                        }, 5000)
                        setPersons(persons.filter(n => n.id !== personExist.id))
                    })
                setErrorMessage(
                    `Updated ${personObj.name}`
                )
                setTimeout(() => {
                    setErrorMessage(null)
                }, 5000)
            }
        }else {
            personService
                .create(personObj)
                .then(returnedPersons => {
                    setPersons(persons.concat(returnedPersons))
                    setNewName('')
                    setNewNumber('')

                    setErrorMessage(
                        `Added ${personObj.name}`
                    )
                    setTimeout(() => {
                        setErrorMessage(null)
                    }, 5000)
                })
                .catch(error=>{
                    setErrorMessage(error.response.data.error)
                    setTimeout(() => {
                        setErrorMessage(null)
                    }, 5000)
                    console.log(error.response.data.error)
                })
        }
    }

    const deletePerson = (id) =>{
        personService
            .deletePerson(id)
            .finally(()=>{
                setPersons(persons.filter(p => p.id !== id))
            })
    }


    return (
        <div style={{margin:20}}>
            <h1>Phonebook</h1>
            <Notification message={errorMessage}/>
            <Filter value={filter} handleFilterChange={handleFilterChange}/>
            <h1> add a new</h1>
            <PersonForm newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handlePhoneChange={handlePhoneChange} addPerson={addPerson}/>
            <h1>Numbers</h1>
            <Number filterPerson={filterPerson} handleDeletePerson={(event)=>handleDeletePerson(event)}/>
        </div>
    )
}

export default App