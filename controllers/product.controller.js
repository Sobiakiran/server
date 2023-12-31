import Product from "../models/product.model.js"


    // Create product
export const addProduct= async (req, res)=>{
    try{
        const {title, desc, image, price, rating, categoryId} = req.body
    const product = new Product({
        title,
        desc ,
        price ,
        image,
        rating,
        category: categoryId 

    })

    await product.save()
    res.status(200).send("successfully")
    }

    catch(err) {
        res.status(500).json({ message: err.message });
    }

    
}
                //  Get all products
export const getProducts = async (req, res) => {
    try{
        const Products = await Product.find().populate('category');
        console.log(Products,' p')
        if(!Products){
            res.status(404).send("Product not found")
        }
        res.status(200).send(Products)
    }
    catch(err) {
        res.status(500).json({ message: err.message });
    }
}
                // Update products
export const updateProduct = async (req, res) => {
    try{
        const {id} =req.params
        const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
        if(!product){
            res.status(404).send({ message: "Product not found" });
        }
    }
    catch(err){
        res.status(500).send({ message: err.message });
    }
}

                 // delete product
export const deteleProduct = async (req, res)=>{
    try{
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
          return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ user });
    }
    catch(err){
        res.status(500).send(err.message)
    }
}