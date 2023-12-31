import Cart from "../models/cart.model.js";

// Add item to cart
export const addItemToCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;
        
        let cart = await Cart.findOne({ user: userId });
        if (cart) {
            // Cart exists for user, check if item exists
            let itemIndex = cart.items.findIndex(p => p.product == productId);
            if (itemIndex > -1) {
                // Product exists in the cart, update the quantity
                let item = cart.items[itemIndex];
                item.quantity = quantity;
                cart.items[itemIndex] = item;
            } else {
                // Product does not exists in cart, add new item
                cart.items.push({ product: productId, quantity: quantity });
            }
            cart = await cart.save();
            res.status(200).json(cart);
        } else {
            // No cart for user, create new cart
            const newCart = await Cart.create({
                user: userId,
                items: [{ product: productId, quantity: quantity }]
            });
            res.status(201).json(newCart);
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get cart for a user
export const getCart = async (req, res) => {
    try {
        const { userId } = req.params;
        const cart = await Cart.findOne({ user: userId }).populate('items.product');
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update cart item
export const updateCartItem = async (req, res) => {
    try {
        const { userId, itemId, quantity } = req.body;

        let cart = await Cart.findOne({ user: userId });
        if (cart) {
            let itemIndex = cart.items.findIndex(p => p._id == itemId);
            if (itemIndex > -1) {
                let item = cart.items[itemIndex];
                item.quantity = quantity;
                cart.items[itemIndex] = item;
                cart = await cart.save();
                res.status(200).json(cart);
            } else {
                res.status(404).json({ message: "Item not found in cart" });
            }
        } else {
            res.status(404).json({ message: "Cart not found" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Remove item from cart
export const removeItemFromCart = async (req, res) => {
    try {
        const { userId, itemId } = req.body;

        let cart = await Cart.findOne({ user: userId });
        if (cart) {
            let itemIndex = cart.items.findIndex(p => p._id == itemId);
            if (itemIndex > -1) {
                cart.items.splice(itemIndex, 1);
                cart = await cart.save();
                res.status(200).json(cart);
            } else {
                res.status(404).json({ message: "Item not found in cart" });
            }
        } else {
            res.status(404).json({ message: "Cart not found" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Clear cart
export const clearCart = async (req, res) => {
    try {
        const { userId } = req.params;

        let cart = await Cart.findOne({ user: userId });
        if (cart) {
            cart.items = [];
            cart = await cart.save();
            res.status(200).json(cart);
        } else {
            res.status(404).json({ message: "Cart not found" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
