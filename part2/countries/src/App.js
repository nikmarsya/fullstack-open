import { useState,useEffect } from 'react'
import axios from 'axios'


const ShowList = ({list,handleShow,selected}) =>{
 
  if(list.length===1){
        return (
          <div>
        <GetOne list={list[0]} />
        <GetWeather list = {list[0]} />
        </div>
        )
  }
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

const GetWeather = ({list}) =>{
  const capital = list.capital[0]
  const lat =list.latlng[0] 
  const lon =list.latlng[1]  
  const w_url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_OPEN_WEATHER_KEY}&units=metric`
  const [wInfo,setWInfo] = useState({"temp":0,"wind":0,"icon":"10d"})
  

    useEffect(() => {
      axios
      .get(w_url)
      .then(res =>{
       const obj = {
        "temp":res.data.main.temp,
        "wind":res.data.wind.speed,
        "icon":res.data.weather[0].icon
       } 
       setWInfo(obj)
        
      })
       // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]); 

  return(

        <div>
          <h3>Weather in {capital}</h3>
          <p>temperature {wInfo.temp} Celcius</p>
          <img src={`http://openweathermap.org/img/wn/${wInfo.icon}.png`} alt='weather'/>
          <p>wind {wInfo.wind} m/s</p>
        </div>
      )

}
const GetOne =  ({list}) =>{    
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
