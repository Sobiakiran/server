import Category from "../models/category.model.js";

// Create a new category
export const addCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const category = new Category({ name });
        await category.save();
        res.status(201).json(category);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get all categories
export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update a category
export const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const updatedCategory = await Category.findByIdAndUpdate(id, { name }, { new: true });
        if (!updatedCategory) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.status(200).json(updatedCategory);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete a category
export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCategory = await Category.findByIdAndDelete(id);
        if (!deletedCategory) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.status(200).json({ message: "Category deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
