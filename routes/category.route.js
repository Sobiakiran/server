import express from "express";
import { addCategory, deleteCategory, getCategories, updateCategory } from "../controllers/category.controller.js";

const router = express.Router()

router.get("/category", getCategories) 
router.post("/create", addCategory)
router.put("/update/:id", updateCategory)
router.delete("/update/:id", deleteCategory)


export default router