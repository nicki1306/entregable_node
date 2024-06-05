import { Router } from "express"
import ProductManager from "../manager/ProductManager.js"
import bcrypt from 'bcryptjs';
import UsersModel from "../dao/models/users.model.js"


const pmanager = new ProductManager()
const router = Router()

router.get("/products", async (req, res) => {
    const listaproductos = await ProductManager.getProducts({})
    res.render("home", { listaproductos })
})


router.get("/realtimeproducts", async (req, res) => {
    res.render("realTimeProducts")
})


router.get("/carts/:cid", async (req, res) => { 
    const { cid } = req.params
    const carrito = await pmanager.getCartbyId(req.params)
    res.render("carts", { carrito })
})

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && bcrypt.compareSync(password, user.password)) {
        req.session.user = user;
        req.session.role = user.email === 'adminCoder@coder.com' ? 'admin' : 'usuario';
        res.redirect('/products');
    } else {
        res.render('login', { error: 'Invalid credentials' });
    }
});

router.post('/register', async (req, res) => {
    const { email, password, ...rest } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);
    const newUser = new User({ email, password: hashedPassword, ...rest });
    await newUser.save();
    res.redirect('/login');
});

router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Error logging out');
        }
        res.redirect('/login');
    });
});



export default router