import multer from 'multer';
import config from './config.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log(file)
        cb(null, config.UPLOAD_DIR)
    },

    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});


export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
export const isValidPassword = (passwordToVerify, storedHash) => bcrypt.compareSync(passwordToVerify, storedHash);

export const createToken = (user, expiresIn) => {
    return jwt.sign({ user }, config.JWT_SECRET, { expiresIn });
};

export const verifyToken = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ origin: config.SERVER, payload: null, error: 'No token provided' });
    jwt.verify(token, config.JWT_SECRET, (err, decoded) => {    
        if (err) return res.status(401).send({ origin: config.SERVER, payload: null, error: 'Failed to authenticate token' });
        req.user = decoded.user;
        next();
    });
};

export const verifyRequiredBody = (requiredFields) => {
    return (req, res, next) => {
        const allOk = requiredFields.every(field =>
            req.body.hasOwnProperty(field) && req.body[field] !== '' && req.body[field] !== null && req.body[field] !== undefined
        );

        if (!allOk) return res.status(400).send({ origin: config.SERVER, payload: 'Faltan propiedades', requiredFields });

        next();
    };
};

export const uploader = multer({ storage: storage });