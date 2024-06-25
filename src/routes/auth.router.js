import { Router } from 'express';
import passport from 'passport';
import config from '../config.js';
import { createHash, isValidPassword, verifyRequiredBody, createToken, verifyToken } from '../utils.js';
import UsersManager from '../dao/models/users.model.js';
import initAuthStrategies from '../auth/session.passport.js';

const router = Router();
const manager = new UsersManager();
initAuthStrategies();

const verifyAdmin = (req, res, next) => {
    if (req.user?.role !== 'admin') {
        return res.status(403).send({ origin: config.SERVER, payload: 'Acceso no autorizado: se requiere autenticación y nivel de admin' });
    }
    next();
};

const verifyAuthorization = role => {
    return (req, res, next) => {
        if (!req.user) return res.status(401).send({ origin: config.SERVER, payload: 'Usuario no autenticado' });
        if (req.user.role !== role) return res.status(403).send({ origin: config.SERVER, payload: 'Sin permisos suficientes' });
        next();
    };
};

router.get('/hash/:password', async (req, res) => {
    res.status(200).send({ origin: config.SERVER, payload: createHash(req.params.password) });
});

router.post('/register', verifyRequiredBody(['firstName', 'lastName', 'email', 'password']), async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const foundUser = await manager.getOne({ email });

        if (!foundUser) {
            const process = await manager.add({ firstName, lastName, email, password: createHash(password) });
            res.status(200).send({ origin: config.SERVER, payload: process });
        } else {
            res.status(400).send({ origin: config.SERVER, payload: 'El email ya se encuentra registrado' });
        }
    } catch (err) {
        res.status(500).send({ origin: config.SERVER, payload: null, error: err.message });
    }
});

router.post('/login', verifyRequiredBody(['email', 'password']), passport.authenticate('login', { failureRedirect: `/login?error=${encodeURI('Usuario o clave no válidos')}` }), (req, res) => {
    try {
        const token = createToken(req.user, '1h');
        res.cookie(`${config.APP_NAME}_cookie`, token, { maxAge: 60 * 60 * 1000, httpOnly: true });
        res.redirect('/profile');
    } catch (err) {
        res.status(500).send({ origin: config.SERVER, payload: null, error: err.message });
    }
});


router.post('/jwtlogin', verifyRequiredBody(['email', 'password']), passport.authenticate('login', { failureRedirect: `/login?error=${encodeURI('Usuario o clave no válidos')}` }), (req, res) => {
    try {
        const token = createToken(req.user, '1h');
        res.cookie(`${config.APP_NAME}_cookie`, token, { maxAge: 60 * 60 * 1000, httpOnly: true });
        res.status(200).send({ origin: config.SERVER, payload: 'Usuario autenticado' });
    } catch (err) {
        res.status(500).send({ origin: config.SERVER, payload: null, error: err.message });
    }
});

router.get('/ghlogin', passport.authenticate('github', { scope: ['user:email'] }));

router.get('/ghlogincallback', passport.authenticate('github', { failureRedirect: `/login?error=${encodeURI('Error al identificar con Github')}` }), (req, res) => {
    try {
        req.session.user = req.user;
        req.session.save(err => {
            if (err) return res.status(500).send({ origin: config.SERVER, payload: null, error: err.message });
            res.redirect('/profile');
        });
    } catch (err) {
        res.status(500).send({ origin: config.SERVER, payload: null, error: err.message });
    }
});

router.get('/admin', verifyToken, verifyAuthorization('admin'), (req, res) => {
    try {
        res.status(200).send({ origin: config.SERVER, payload: 'Bienvenido ADMIN!' });
    } catch (err) {
        res.status(500).send({ origin: config.SERVER, payload: null, error: err.message });
    }
});

router.get('/ppadmin', passport.authenticate('jwt', { session: false }), verifyAuthorization('admin'), (req, res) => {
    try {
        res.status(200).send({ origin: config.SERVER, payload: 'Bienvenido ADMIN!' });
    } catch (err) {
        res.status(500).send({ origin: config.SERVER, payload: null, error: err.message });
    }
});

router.get('/logout', (req, res) => {
    req.logout(err => {
        if (err) return res.status(500).send({ origin: config.SERVER, payload: 'Error al ejecutar logout', error: err });
        res.redirect('/login');
    });
});

export default router;
