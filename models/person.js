const mongoose = require('mongoose')

const url = process.env.MONGODB_URI


console.log('connecting to...')


mongoose. connect(url)
    .then(result =>console.log('Connected to MongoDB'))
    .catch(err=>console.log('Error: ',err.message))

const personSchema = new mongoose.Schema({
    name: {
            type:String,
            minLength:3,
            required:true
          },
    number:{
            type: String,
            min:8,
            validate: {
              validator: function (v) {
                return /^\d{2,3}-\d{5,}$/.test(v);
              },
              message: '{VALUE} is not a valid phone number!'
            },
            required:true
    }
  })

  personSchema.set('toJSON',{
    transform:(doc,returnedObj)=>{
        returnedObj.id =returnedObj._id.toString()
        delete returnedObj._id
        delete returnedObj.__v
    }
  })
  
module.exports = mongoose.model('Person', personSchema)