import { Router } from "express";
import CartManager from "../manager/CartManager.js";

const cmanager = new CartManager();
const router = Router();

router.get('/carts', async (req, res) => {
    try {
        const carts = await cmanager.getCarts({});
        res.render('carts', { carts });
    } catch (error) {
        console.error('Error al obtener carritos:', error);
        res.status(500).send('Error al obtener carritos');
    }
});

router.get('/carts/:cid', async (req, res) => { 
    try {
        const { cid } = req.params;
        const cart = await cmanager.getCartById(cid);
        res.render('cart', { cart });
    } catch (error) {
        console.error('Error al obtener el carrito:', error);
        res.status(500).send('Error al obtener el carrito: ' + error.message);
    }
});

router.post('/carts', async (req, res) => {
    try {
        const newCart = await cmanager.addCart();
        res.status(201).send(newCart);
    } catch (error) {
        console.error('Error al crear el carrito:', error);
        res.status(500).send('Error al crear el carrito: ' + error.message);
    }
});

router.post('/carts/:cid/products/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const updatedCart = await cmanager.addProductToCart(cid, pid);
        res.send(updatedCart);
    } catch (error) {
        console.error('Error al agregar producto al carrito:', error);
        res.status(500).send('Error al agregar producto al carrito: ' + error.message);
    }
});

router.delete('/carts/:cid/products/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const updatedCart = await cmanager.removeProductFromCart(cid, pid);
        res.send(updatedCart);
    } catch (error) {
        console.error('Error al remover producto del carrito:', error);
        res.status(500).send('Error al remover producto del carrito: ' + error.message);
    }
});

router.delete('/carts/:cid', async (req, res) => {
    try {
        const { cid } = req.params;
        const deletedCart = await cmanager.deleteCart(cid);
        res.send(deletedCart);
    } catch (error) {
        console.error('Error al eliminar el carrito:', error);
        res.status(500).send('Error al eliminar el carrito: ' + error.message);
    }
});

export default router;

