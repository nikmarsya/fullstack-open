const mongoose = require('mongoose')

const url = process.env.MONGODB_URI


console.log('connecting to...')


mongoose. connect(url)
    .then(result =>console.log('Connected to MongoDB'))
    .catch(err=>console.log('Error: ',err.message))

const personSchema = new mongoose.Schema({
    name: String,
    number: String
  })

  personSchema.set('toJSON',{
    transform:(doc,returnedObj)=>{
        returnedObj.id =returnedObj._id.toString()
        delete returnedObj._id
        delete returnedObj.__v
    }
  })
  
module.exports = mongoose.model('Person', personSchema)