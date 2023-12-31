import mongoose from 'mongoose'
const userSchema = new mongoose.Schema({
    name:{
        type: 'string',
        default: ''
    },
    email:{
        type: 'string',
        unique: true,
    },
    password:{
        type: 'string',
        default :""
    }
})
const user = mongoose.model("Users",userSchema);
export default user;