import express from "express";
import { getProducts, addProduct, updateProduct, deteleProduct } from "../controllers/product.controller.js";

const router = express.Router()

router.get("/getproduct", getProducts) 
router.post("/create", addProduct)
router.put("/update/:id", updateProduct)
router.delete("/update/:id", deteleProduct)


export default router