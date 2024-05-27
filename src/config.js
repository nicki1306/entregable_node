
import path from 'path';

const config = {
    SERVER: 'server500',
    MONGODB_URI: 'mongodb+srv://nicki:<gatito13>@cluster0.sxitpsr.mongodb.net/ecommerce',
    DIRNAME: path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:\/)/, '$1')),
    get UPLOAD_DIR() { return `${this.DIRNAME}/public/img` }
};

export default config;