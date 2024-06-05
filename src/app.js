import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import mongoose from 'mongoose';
import handlebars from 'express-handlebars';
import initSocket from './socket.io.js';
import config from './config.js';
import viewRouter from './routes/view.router.js';
import productRouter from './routes/products.router.js';
import cartRouter from './routes/carts.router.js';
import userRouter from './routes/user.routes.js';
import FileStore from 'session-file-store';
import cookieRouter from './routes/cookies.router.js';
import sessionsRouter from './routes/sessions.router.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const expressInstance = app.listen(config.PORT, async () => {
    await mongoose.connect(config.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log(`Servidor escuchando en http://localhost:${config.PORT}`);
});

// Configuración de cookies y sesiones
const fileStorage = FileStore(session)
app.use(cookieParser());
app.use(session({
    store: new fileStorage({
        path: './sessions',
        mongoUrl: config.MONGODB_URI,
        mongoOptions: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
        ttl: 60 * 60 * 24 // 1 día
    }),
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // 1 día
    }
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(config.SECRET));
app.use('/static', express.static(path.join(__dirname, 'public')));

// Configuración de Handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

// Rutas
app.use('/', viewRouter);
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use('/api/users', userRouter);
app.use('api/cookies', cookieRouter);
app.use('/api/sessions', sessionsRouter);

// Socket.io
const socketServer = initSocket(expressInstance);
app.set('socketServer', socketServer);
