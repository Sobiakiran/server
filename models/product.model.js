import mongoose from 'mongoose'
const userSchema = new mongoose.Schema({
    title:{
        type: 'string',
        unique: true,
    },
    price:{
        type: 'string',
        default :""
    },
    image:{
        type: 'string',
        default :""
    },
    desc:{
        type: 'string',
        default :""
    },
    rating:{
        type: 'string',
        default: ""
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    }
})
const product = mongoose.model("Products",userSchema);
export default product;