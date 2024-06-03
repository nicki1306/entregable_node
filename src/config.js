import path from 'path';

const config = {
    PORT: 8080,
    SERVER: 'server500',
    MONGODB_URI: 'mongodb+srv://nicki:gatito1306@cluster0.sxitpsr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    DIRNAME: path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:\/)/, '$1')),

    get UPLOAD_DIR() { return `${this.DIRNAME}/public` }
};

export default config;
