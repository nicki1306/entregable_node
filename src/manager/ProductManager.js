import fs from 'fs';

class Product {
    constructor(title, description, price, thumbnail, code, stock) {
        this.id = this.generateId();
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
    }

    generateId() {
        return '_' + Math.random().toString(36).substring(2, 9);
    }
}

class ProductManager {
    constructor(filePath) {
        this.path = filePath;
    }

    async addProduct(product) {
        const products = await this.getProducts();
        const nextId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
        const newProduct = { id: nextId, ...product };
        products.push(newProduct);
        await this.saveProducts(products);
        return newProduct;
    }

    async getProducts() {
        try {
            const data = await fs.promises.readFile(this.path, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            throw new Error(`Error al leer el archivo JSON: ${error.message}`);
        }
    }

    async getProductById(productId) {
        const products = await this.getProducts();
        const product = products.find(p => p.id === productId);
        if (!product) {
            throw new Error('Producto no encontrado.');
        }
        return product;
    }

    async updateProduct(productId, updatedFields) {
        let products = await this.getProducts();
        const index = products.findIndex(p => p.id === productId);
        if (index === -1) {
            throw new Error('Producto no encontrado.');
        }
        products[index] = { ...products[index], ...updatedFields };
        await this.saveProducts(products);
    }

    async deleteProduct(productId) {
        let products = await this.getProducts();
        products = products.filter(p => p.id !== productId);
        await this.saveProducts(products);
    }

    async saveProducts(products) {
        try {
            const data = JSON.stringify(products, null, 2);
            await fs.promises.writeFile(this.path, data);
        } catch (error) {
            throw new Error(`Error al escribir en el archivo JSON: ${error.message}`);
        }
    }
}

const productManager = new ProductManager('/src/public/data/products.json');

(async () => {
    try {
        const newProduct = {
            title: 'Producto Nuevo',
            description: 'Descripción del producto nuevo',
            price: 100,
            thumbnail: 'imagen.jpg',
            code: 'ABC123',
            stock: 50
        };
    
        const addedProduct = await productManager.addProduct(newProduct);
        console.log('Producto agregado:', addedProduct);
    
        const productId = addedProduct.id;
        const product = await productManager.getProductById(productId);
        console.log('Producto encontrado por ID:', product);
    
        const updatedFields = {
            title: 'Producto Modificado',
            description: 'Descripción del producto modificado',
            price: 150,
            thumbnail: 'imagen_modificada.jpg',
            stock: 30
        };
    
        await productManager.updateProduct(productId, updatedFields);
        console.log('Producto modificado:', await productManager.getProductById(productId));
    
        await productManager.deleteProduct(productId);
        console.log('Producto eliminado. Productos restantes:', await productManager.getProducts());
    } catch (error) {
        console.error('Error:', error.message);
    }
})

();



export default ProductManager