const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const dotenv =require('dotenv').config()
const app = express()
const Person = require('./models/person')

const PORT = process.env.PORT

app.use(express.json())
app.use(express.static('build'))
app.use(cors())
morgan.token('data',(req, res)=>{ return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))


  
app.get('/api/persons',(req,res,next)=>{
    Person.find({})
        .then(result=>{  
            res.json(result)
        })
        .catch(err=>next(err))
})

app.get('/api/persons/:id',(req,res,next)=>{
    Person.findById(req.params.id)
        .then(result=>{
            if(result)
                res.json(result)
            else
                res.status(404).end()
        })
        .catch(err=>next(err))
})

app.post('/api/persons',(req,res,next)=>{
    const body = req.body

    const p = new Person({
        name: body.name,
        number:body.number
    })    
            
    p.save()
     .then(savedPerson=>{
        res.json(savedPerson)
     })
     .catch(err=>{
        console.log('err',err)
        next(err)})
            }
)


app.put('/api/persons/:id',(req,res,next)=>{
    const {name,number} = req.body

    Person.findByIdAndUpdate(req.params.id,{name,number},{new:true,runValidators:true,context:'query'})
    .then(updatedPerson=>res.json(updatedPerson))
    .catch(err=>{
        console.log('err',err)
        next(err)})

})

app.delete('/api/persons/:id',(req,res,next)=>{
   Person.findByIdAndRemove(req.params.id)
   .then(result =>   res.status(204).end())
   .catch(err => next(err))
})

app.get('/api/info',(req,res,next)=>{
    const date = Date()
    let number =0
    Person.collection.count({})
    .then( n => {res.send(`<p>Phonebook has info on ${n} people</p>${date}` )
    })
    .catch(err=>next(err))

    
})
app.listen(PORT,()=>console.log(`server listening at port ${PORT}`))

const errorHandler = (err,req,res,next)=>{
   console.log('error',err.name)
    if(err.name==='CastError')
        return res.status(400).send({error:'malformatted id'})
    else if(err.name ==='ValidationError')
        return res.status(400).send({error:err.message})
    next(err)
}
app.use(errorHandler)
