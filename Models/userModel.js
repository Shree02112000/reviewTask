const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    userName :{
        type: String,
        
    }, 

    emailId :{
        type: String,
        
    },
    phoneNumber:{
        type: Number,
        
    },
    password:{
        type: String,
    

    }
},{timestamps:true})


const User = mongoose.model('User',UserSchema)

module.exports=User