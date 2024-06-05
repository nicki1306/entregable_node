
import bcrypt from "bcrypt"

const router = express.Router()

import express from 'express';

// Mock database
const users = [
    {
        email: 'adminCoder@coder.com',
        password: bcrypt.hashSync('adminCod3r123', 10),
        role: 'admin'
    }
];

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = users.find(user => user.email === email);

    if (user && await bcrypt.compare(password, user.password)) {
        req.session.user = { email: user.email, role: user.role };
        return res.redirect('/products');
    }

    res.redirect('/auth/login');
});

router.post('/register', async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ email, password: hashedPassword, role: 'user' });
    res.redirect('/auth/login');
});

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/auth/login');
});

export default router;
