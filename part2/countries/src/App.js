import { useState,useEffect } from 'react'
import axios from 'axios'

const ShowList = ({list}) =>{
  console.log('list length',list.length)
  if(list.length===1)
    return <GetOne list={list} />
  if(list.length<11)
    return(list.map(country => <p key={country.name.common}>{country.name.common}</p>))
  else
    return(<p>Too many matches specify another filter</p>)
}

const GetOne = ({list}) =>{
 
  const name = list[0].name.common
  const capital = list[0].capital[0]
  const area = list[0].area
  const flag = list[0].flag
  const languages = Object.values(list[0].languages)


  return(
      <div>
        <h1>{name}</h1>
        <p>capital {capital}</p>
        <p>area {area}</p>
        <div><strong>languages</strong><ul> {
          languages.map(language => <li> {language} </li>)
          } </ul></div>
        <h1>{flag}</h1>
      </div>
  )
}

function App() {
  const [search,setSearch] = useState([])
  const [countries,SetCountries] = useState([])

  useEffect(()=>{
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response =>{
        SetCountries(response.data)
        setSearch(response.data)
      })
  },[])

  
  
  
  const handleChange = e =>{
    setSearch(countries.filter(country => (country.name.common.toLowerCase()).includes(e.target.value.toLowerCase())))
    
  }
  return (
    <div>
      <p>Find countries: <input type='text' onChange={handleChange} /></p>
      <div>
        <ShowList list={search} />
      </div>     
    </div>
  )
}



export default App;
