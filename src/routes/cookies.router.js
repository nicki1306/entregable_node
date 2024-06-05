// routes/cookies.router.js
import { Router } from 'express';
import cookieParser from 'cookie-parser';

const router = Router();

// Ruta para establecer una cookie
router.get('/set', (req, res) => {
    res.cookie('nombreCookie', 'valorCookie', { maxAge: 900000, httpOnly: true });
    res.send('Cookie establecida');
});

// Ruta para obtener una cookie
router.get('/get', (req, res) => {
    const nombreCookie = req.cookies.nombreCookie;
    res.send(`Valor de la cookie: ${nombreCookie}`);
});

// Ruta para eliminar una cookie
router.get('/delete', (req, res) => {
    res.clearCookie('nombreCookie');
    res.send('Cookie eliminada');
});

export default router;
