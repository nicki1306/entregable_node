import multer from 'multer';
import config from './config.js';
import bcrypt from 'bcrypt';

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