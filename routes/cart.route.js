import express from "express";
import { getCart, addItemToCart, updateCartItem, removeItemFromCart } from "../controllers/cart.controller.js";

const router = express.Router()

router.get("/cart", getCart) 
router.post("/create", addItemToCart)
router.put("/update/:id", updateCartItem)
router.delete("/update/:id", removeItemFromCart)


export default router