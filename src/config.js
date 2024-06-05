import path from 'path';

const config = {
    PORT: 8080,
    SERVER: 'Atlas',
    MONGODB_URI: 'mongodb+srv://nicki:gatito1306.@cluster0.sxitpsr.mongodb.net/',
    MONGODB_ID_REGEX: /^[a-fA-F0-9]{24}$/,
    DIRNAME: path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:\/)/, '$1')),
    SECRET: 'secret', 

    get UPLOAD_DIR() { return `${this.DIRNAME}/public` }
};

export default config;


//aafb382d74d047b96dffde446aa9019b923b3b41