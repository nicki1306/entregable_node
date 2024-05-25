
import path from 'path';

const config = {
    SERVER: 'http://localhost',
    MONGO_URL: 'mongodb+srv://nickiicn:<gatito1306>@cluster0.sxitpsr.mongodb.net/',
    PORT: 8080,
    DIRNAME: path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:\/)/, '$1')),
    get UPLOAD_DIR() { return `${this.DIRNAME}/public/img` }
};

export default config;