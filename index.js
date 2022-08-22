const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 3001

app.use(express.json())
app.use(express.static('build'))
app.use(cors())
morgan.token('data',(req, res)=>{ return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))


const generateID = () =>{
    return Math.floor(Math.random() * 1000)
}

let persons=[
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons',(req,res)=>{
    res.json(persons)
})

app.get('/api/persons/:id',(req,res)=>{
    const id = Number(req.params.id)
    const person = persons.find(p=>p.id===id)

    if(person)
        res.json(person)
    else    
        res.status(404).json({error:'contact person not found'})

})
app.post('/api/persons',(req,res)=>{
    const body = req.body

    if(!body.name)
        return res.status(400).json({error:'name is missing'})
    if(!body.number)
        return res.status(400).json({error:'number is missing'})

    if(persons.find(p=>p.name===body.name))
    return res.status(400).json({error:'contact person already exists'})

    const person = {
        name: body.name,
        number:body.number,
        id: generateID()
    }    
    persons = persons.concat(person)

    res.json(person)
})

app.delete('/api/persons/:id',(req,res)=>{
    const id = Number(req.params.id)
    persons = persons.filter(p=>p.id!==id)

    res.status(204).end()
})

app.get('/info',(req,res)=>{
    const no = persons.length
    
    res.send(`<p>Phonebook has info of ${no} people <p> ${Date()}`)
})

app.listen(PORT,()=>console.log(`server listening at port ${PORT}`))