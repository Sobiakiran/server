import express from 'express'
import mongoose from 'mongoose'
import bodyparser from 'body-parser'
import router from './routes/user.route.js';
import productRoute from "./routes/product.route.js"
import categoryRoute from "./routes/category.route.js"
import cartRoute from "./routes/cart.route.js"

const app = express()
const PORT = 4000;
app.use(bodyparser.json())
const connect = async()=>{
    await mongoose.connect(process.env.MONGOOSE_URI).then(
        console.log('connection established')
    )
        
    };
    connect();
    app.use("/", router);
    app.use("/api/products", productRoute);
    app.use("/api/categories", categoryRoute);
    app.use("/api/carts", cartRoute);


 
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})