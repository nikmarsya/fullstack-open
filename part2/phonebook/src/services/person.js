import axios from 'axios'
const baseUrl ='http://localhost:3001/persons' 

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
    const req = axios.delete(`${baseUrl}/${id}`,deletedPerson)
    return req.then(res => res.data)
}
//eslint-disable-next-line
export default {getAll,create,update,deleteServices}