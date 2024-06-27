import { Router } from "express";
import bcrypt from 'bcryptjs';
import User from "../dao/models/users.model.js";

const router = Router();

// Renderizar la página de chat
router.get('/chat', (req, res) => {
    res.render('chat', {});
});

// Renderizar la página de registro
router.get('/register', (req, res) => {
    res.render('register', {});
});

// Obtener y renderizar la lista de productos
router.get('/products/:page', async (req, res) => {
    try {
        const products = await ProductManager.getProducts({});
        res.render('products', { products });
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).send('Error al obtener productos');
    }
});

// Renderizar la página de productos en tiempo real
router.get("/realtimeproducts", (req, res) => {
    res.render("realTimeProducts");
});

// Obtener y renderizar el carrito por ID
router.get("/carts/:cid", async (req, res) => {
    try {
        const { cid } = req.params;
        const carrito = await cmanager.getCartById(cid);
        res.render("carts", { cart });
    } catch (error) {
        res.status(500).send('Error al obtener el carrito: ' + error.message);
    }
});

// Renderizar la página de inicio de sesión
router.get('/login', (req, res) => {
    res.render('login');
});

// Procesar datos de inicio de sesión
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (user && bcrypt.compareSync(password, user.password)) {
            req.session.user = user;
            req.session.role = user.email === 'adminCoder@coder.com' ? 'admin' : 'usuario';
            res.redirect('/products'); // Redirigir a la página de productos después del inicio de sesión
        } else {
            res.render('login', { error: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).send('Error al iniciar sesión: ' + error.message);
    }
});

// Renderizar la página de registro
router.get('/register', (req, res) => {
    res.render('register');
});

// Procesar datos de registro de usuario
router.post('/register', async (req, res) => {
    try {
        const { email, password, ...rest } = req.body;
        const hashedPassword = bcrypt.hashSync(password, 8);
        const newUser = new User({ email, password: hashedPassword, ...rest });
        await newUser.save();
        res.redirect('/login'); // Redirigir a la página de inicio de sesión después del registro exitoso
    } catch (error) {
        res.status(500).send('Error al registrar: ' + error.message);
    }
});

// Cerrar sesión y destruir la sesión del usuario
router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Error logging out');
        }
        res.redirect('/login'); // Redirigir a la página de inicio de sesión después de cerrar sesión
    });
});

export default router;

