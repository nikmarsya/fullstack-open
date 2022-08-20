import { useState,useEffect } from 'react'
import personServices from './services/person'
import './index.css'

const Notification = (props) => {

  if (props.notice.message === '') {
    return null
  }
else
  return (
    props.notice.type===0?<div className='notify'>{props.notice.message}</div>:<div className='error'>{props.notice.message}</div>
  )
}

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
  const [notification,setNotification] =useState({'type':0,'message':''})
  
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
            setNotification({'type':0,'message':`Added ${newName}'s new number `})
          setTimeout(()=>{
            setNotification('')
          },5000)
          })
          .catch(e=>{
            setNotification({'type':1,'message':`Information on ${newName} has already been removed from server`})
            setTimeout(()=>{
              setNotification({...notification,'message':''})
            },5000)
          })
      }

    }else{
      personServices
      .create(newPerson)
      .then(np =>{
          setPersons(persons.concat(np))
          setFilteredList(persons.concat(np))
          setNotification({'type':0,'message':`Added ${np.name} `})
          setTimeout(()=>{
            setNotification({...notification,'message':''})
          },5000)
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
      .then( res =>{
        setPersons(persons.filter(p =>p.id!==id))
        setFilteredList(persons.filter(p =>p.id!==id))
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
      <Notification notice={notification} />
      <Filter handleChange={handleFilter} />
      <h2>Add new contact</h2>
      <PersonForm newName={newName} handleName={handleName} newNumber={newNumber} handleNumber={handleNumber} addName={addName} />
      <h2>Numbers</h2>
      <Persons filteredList={filteredList} handleDelete={handleDelete}/>
    </div>
    
  
  )
}

export default App