import { Router } from "express";
import ProductManager from "../manager/ProductManager.js";
import bcrypt from 'bcryptjs';
import User from "../dao/models/users.model.js"; 

const pmanager = new ProductManager();
const router = Router();

router.get("/products", async (req, res) => {
    try {
        const listaproductos = await pmanager.getProducts();
        res.render("home", { listaproductos });
    } catch (error) {
        res.status(500).send('Error al obtener productos: ' + error.message);
    }
});

router.get("/realtimeproducts", async (req, res) => {
    res.render("realTimeProducts");
});

router.get("/carts/:cid", async (req, res) => { 
    try {
        const { cid } = req.params;
        const carrito = await pmanager.getCartById(cid);
        res.render("carts", { carrito });
    } catch (error) {
        res.status(500).send('Error al obtener el carrito: ' + error.message);
    }
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (user && bcrypt.compareSync(password, user.password)) {
            req.session.user = user;
            req.session.role = user.email === 'adminCoder@coder.com' ? 'admin' : 'usuario';
            res.redirect('/products');
        } else {
            res.render('login', { error: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).send('Error al iniciar sesión: ' + error.message);
    }
});

router.post('/register', async (req, res) => {
    try {
        const { email, password, ...rest } = req.body;
        const hashedPassword = bcrypt.hashSync(password, 8);
        const newUser = new User({ email, password: hashedPassword, ...rest });
        await newUser.save();
        res.redirect('/login');
    } catch (error) {
        res.status(500).send('Error al registrar: ' + error.message);
    }
});

router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Error logging out');
        }
        res.redirect('/login');
    });
});

export default router;
