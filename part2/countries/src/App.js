import { useState,useEffect } from 'react'
import axios from 'axios'


const ShowList = ({list,handleShow,selected}) =>{
 
  if(list.length===1)
    return <GetOne list={list[0]} />

  if(list.length<11){
    return(
      list.map((country,id) => {
        return(
        <div key={country.name.common}>
          {country.name.common} 
          <button id={id} onClick={handleShow}>show</button>
          {selected===id.toString()?<GetOne list={country} />: ''}
         </div>
    )})
    )
  }else
    return(<p>Too many matches specify another filter</p>)
}

const GetOne = ({list}) =>{
 
  const name = list.name.common
  const capital = list.capital[0]
  const area = list.area
  const flag = list.flag
  const languages = Object.values(list.languages)


  return(
      <div>
        <h1>{name}</h1>
        <p>capital {capital}</p>
        <p>area {area}</p>
        <div><strong>languages</strong><ul> {
          languages.map(language => <li key={language}> {language} </li>)
          } </ul></div>
        <h1>{flag}</h1>
      </div>
  )
}

function App() {
 
  const [search,setSearch] = useState([])
  const [countries,SetCountries] = useState([])
  const [key,setKey] =useState(' ')
  
  const handleShow = e =>{
    setKey(e.target.id)
   
  }

  useEffect(()=>{
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response =>{
        SetCountries(response.data)
      })
  },[])

  
  const handleChange = e =>{
    setSearch(countries.filter(country => (country.name.common.toLowerCase()).includes(e.target.value.toLowerCase())))
    if(e.target.value==='')
      setKey('')
  }
  return (
    <div>
      <p>Find countries: <input type='text' onChange={handleChange} /></p>
      <div>
        <ShowList list={search} handleShow={handleShow} selected={key} />
      </div>     
    </div>
  )
}



export default App;
