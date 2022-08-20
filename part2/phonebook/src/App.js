import { useState,useEffect } from 'react'
import personServices from './services/person'

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

const Persons = ({filteredList,handleDelete}) =>{

  return(
    <div> {filteredList.map(person => 
    <p key={person.id}> {person.name} {person.number} 
    <button id={person.id} onClick={handleDelete}>delete</button>
    </p>
    )}</div>
  )
}

const App = () =>{
  const [persons,setPersons] = useState([])
  const [filteredList,setFilteredList] = useState([])
  const [newName,setNewName] = useState('')
  const [newNumber,setNewNumber] = useState('')  
  
  useEffect(()=>{
   personServices
      .getAll()
      .then(initialData=>{
        setPersons(initialData)
        setFilteredList(initialData)
      })
  },[])

  const addName = (e) =>{
    e.preventDefault()
    
    const newPerson = {
      name:newName,
      number:newNumber,
    }

    if(persons.some(person => person.name===newPerson.name)){
      const confirm = window.confirm(`${newName} is already added to phonebook,replace old number with a new one?`)
      if(confirm){
        const updatePerson = persons.find(p => p.name ===newName) 
        personServices
          .update(updatePerson.id,newPerson)
          .then(updateData =>{
            setPersons(persons.map(p=>p.id===updatePerson.id?updateData:p))
            setFilteredList(persons.map(p=>p.id===updatePerson.id?updateData:p))
          })
      }

    }else{
      personServices
      .create(newPerson)
      .then(np =>{
          setPersons(persons.concat(np))
          setFilteredList(persons.concat(np))
    })
    }
    setNewName('')
    setNewNumber('')
  }

  const handleDelete = e =>{
    const id =parseInt(e.target.id)
    const deletePerson = persons.find(p=>p.id===id)
    const confirm = window.confirm(`Delete ${deletePerson.name} ?`)

    if(confirm)
      personServices
      .deleteServices(id,deletePerson)
      .then(del =>{
        setPersons(persons.filter(p =>p.id!==del.id))
        setFilteredList(persons.filter(p =>p.id!==del.id))
      })
  }
  const handleFilter = (e) =>{
    setFilteredList(persons.filter(person=>(person.name.toLowerCase()).includes(e.target.value.toLowerCase())))
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
      <Persons filteredList={filteredList} handleDelete={handleDelete}/>
    </div>
    
  
  )
}

export default App