// managers/ProductManager.js
import mongoose from 'mongoose';
import Product from '../dao/models/products.model.js';

class ProductManager {
    constructor() {
        mongoose.connect('mongodb+srv://nicki:gatito1306@cluster0.sxitpsr.mongodb.net/ecommerce', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    }

    async addProduct(productData) {
        try {
            const newProduct = new Product(productData);
            await newProduct.save();
            return newProduct;
        } catch (error) {
            throw new Error(`Error al agregar el producto: ${error.message}`);
        }
    }

    async getProducts() {
        try {
            return await Product.find();
        } catch (error) {
            throw new Error(`Error al obtener los productos: ${error.message}`);
        }
    }

    async getProductById(productId) {
        try {
            const product = await Product.findById(productId);
            if (!product) {
                throw new Error('Producto no encontrado.');
            }
            return product;
        } catch (error) {
            throw new Error(`Error al obtener el producto: ${error.message}`);
        }
    }

    async updateProduct(productId, updatedFields) {
        try {
            const updatedProduct = await Product.findByIdAndUpdate(productId, updatedFields, { new: true });
            if (!updatedProduct) {
                throw new Error('Producto no encontrado.');
            }
            return updatedProduct;
        } catch (error) {
            throw new Error(`Error al actualizar el producto: ${error.message}`);
        }
    }

    async deleteProduct(productId) {
        try {
            const deletedProduct = await Product.findByIdAndDelete(productId);
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
