import { Router } from 'express';
import Cart from '../models/carts.model.js';
import Product from '../models/products.models.js';

const router = Router();

// Crear un nuevo carrito
router.post('/', async (req, res) => {
    const newCart = new Cart({ products: [] });
    await newCart.save();
    res.json({ status: 'success', cart: newCart });
});

// Obtener un carrito por ID
router.get('/:id', async (req, res) => {
    const cart = await Cart.findById(req.params.id).populate('products.productId');
    if (!cart) {
        return res.status(404).json({ error: 'Cart not found' });
    }
    res.json({ status: 'success', cart });
});

// Agregar un producto al carrito
router.post('/:id/products', async (req, res) => {
    const { productId, quantity } = req.body;
    const cart = await Cart.findById(req.params.id);
    if (!cart) {
        return res.status(404).json({ error: 'Cart not found' });
    }

    const product = await Product.findById(productId);
    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }

    const existingProductIndex = cart.products.findIndex(p => p.productId.toString() === productId);
    if (existingProductIndex >= 0) {
        cart.products[existingProductIndex].quantity += quantity;
    } else {
        cart.products.push({ productId, quantity });
    }

    await cart.save();
    res.json({ status: 'success', cart });
});

// Eliminar un producto del carrito
router.delete('/:id/products/:productId', async (req, res) => {
    const { id, productId } = req.params;
    const cart = await Cart.findById(id);
    if (!cart) {
        return res.status(404).json({ error: 'Cart not found' });
    }

    cart.products = cart.products.filter(p => p.productId.toString() !== productId);
    await cart.save();
    res.json({ status: 'success', cart });
});

export default router;
