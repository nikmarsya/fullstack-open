import { useState,useEffect } from 'react'
import axios from 'axios'

const Filter = ({handleChange}) =>{
  return(
    <div>
            filter shown with: <input onChange={handleChange} />
    </div>
  )
}

const PersonForm = (props) =>{
return(
  <form>
  <div>
    <p>name: <input value={props.newName} onChange={props.handleName} /></p>
    <p>number: <input value={props.newNumber} onChange={props.handleNumber} /></p>
  </div>
  <div>
      <button type='submit' onClick={props.addName} >add</button>
  </div>
</form>
)
}

const Persons = ({filteredList}) =>{

  return(
    <div> {filteredList.map(person => <p key={person.name}> {person.name} {person.number} </p>)}</div>
  )
}

const App = () =>{
  const [persons,setPersons] = useState([])
  const [filteredList,setFilteredList] = useState([])
  const [newName,setNewName] = useState('')
  const [newNumber,setNewNumber] = useState('')  

  useEffect(()=>{
    axios
      .get('http://localhost:3001/persons')
      .then(response=>{
        setPersons(response.data)
        setFilteredList(response.data)
      })
  },[])

  const addName = (e) =>{
    e.preventDefault()
    
    const newPerson = {
      name:newName,
      number:newNumber,
    }

    if(persons.some(person => person.name===newPerson.name))
      alert(`${newName} is already added to phonebook`)
    else{
      setPersons(persons.concat(newPerson))
      setFilteredList(persons.concat(newPerson))
    }
    setNewName('')
    setNewNumber('')
  }

  const handleFilter = (e) =>{
    setFilteredList(persons.filter(person=>(person.name.toLowerCase()).includes(e.target.value.toLowerCase())

    
    ))
    
  
  } 

  const handleName = (e) => setNewName(e.target.value)

  const handleNumber = (e) => setNewNumber(e.target.value)


  return(
    <div>
      <h2>Phonebook</h2>
      <Filter handleChange={handleFilter} />
      <h2>Add new contact</h2>
      <PersonForm newName={newName} handleName={handleName} newNumber={newNumber} handleNumber={handleNumber} addName={addName} />
      <h2>Numbers</h2>
      <Persons filteredList={filteredList}/>
    </div>
    
  
  )
}

export default App