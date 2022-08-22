import axios from 'axios'
const baseUrl ='/api/persons' 

const getAll = () =>{
    const req = axios.get(baseUrl)
   return req.then(res => res.data)
}

const create = (newPerson) =>{
    const req = axios.post(baseUrl,newPerson)
   return req.then(res => res.data)
}

const update = (id, updatedPerson) =>{
    const req = axios.put(`${baseUrl}/${id}`,updatedPerson)
    return req.then(res => res.data)
}

const deleteServices = (id, deletedPerson) =>{
    return axios.delete(`${baseUrl}/${id}`,deletedPerson)
    
   
}
//eslint-disable-next-line
export default {getAll,create,update,deleteServices}