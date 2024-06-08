import mongoose from 'mongoose';
import config from '../config.js';

// Definición del esquema del producto
const ProductSchema = new mongoose.Schema({
    title: String,
    description: String,
    stock: Number,
    thumbnail: String,
    category: String,
    price: Number,
    status: Boolean,
    code: String
});

// Creación del modelo del producto
const product = mongoose.model('products', ProductSchema);

class ProductManager {
    // Método para obtener productos con una consulta opcional
    static async getProducts(query = {}) {
        try {
            const products = await product.find(query);
            return products;
        } catch (error) {
            console.error('Error al obtener productos:', error);
            throw error;
        }
    }

    // Método para agregar un producto
    async addProduct(productData) {
        try {
            const newProduct = new product(productData);
            await newProduct.save();
            return newProduct;
        } catch (error) {
            throw new Error(`Error al agregar el producto: ${error.message}`);
        }
    }

    // Método para obtener todos los productos
    async getAllProducts() {
        try {
            return await product.find();
        } catch (error) {
            throw new Error(`Error al obtener los productos: ${error.message}`);
        }
    }

    // Método para obtener un producto por su ID
    async getProductById(productId) {
        try {
            const product = await productId.findById(productId);
            if (!product) {
                throw new Error('Producto no encontrado.');
            }
            return product;
        } catch (error) {
            throw new Error(`Error al obtener el producto: ${error.message}`);
        }
    }

    // Método para actualizar un producto
    async updateProduct(productId, updatedFields) {
        try {
            const updatedProduct = await productId.findByIdAndUpdate(productId, updatedFields, { new: true });
            if (!updatedProduct) {
                throw new Error('Producto no encontrado.');
            }
            return updatedProduct;
        } catch (error) {
            throw new Error(`Error al actualizar el producto: ${error.message}`);
        }
    }

    // Método para eliminar un producto
    async deleteProduct(productId) {
        try {
            const deletedProduct = await productId.findByIdAndDelete(productId);
            if (!deletedProduct) {
                throw new Error('Producto no encontrado.');
            }
            return deletedProduct;
        } catch (error) {
            throw new Error(`Error al eliminar el producto: ${error.message}`);
        }
    }
}

export default ProductManager;

