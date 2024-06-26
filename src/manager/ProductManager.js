import Product from '../dao/models/products.model.js';

class ProductManager {
    static async addProduct(data) {
        try {
            const product = new Product(data);
            await product.save();
            return product;
        } catch (error) {
            console.error('Error al agregar el producto:', error);
            throw new Error(`Error al agregar el producto: ${error.message}`);
        }
    }

    static async getProducts(query = {}) {
        try {
            return await Product.find(query);
        } catch (error) {
            console.error('Error al obtener productos:', error);
            throw new Error(`Error al obtener productos: ${error.message}`);
        }
    }

    static async getProductById(id) {
        try {
            const product = await Product.findById(id);
            if (!product) {
                throw new Error('Producto no encontrado.');
            }
            return product;
        } catch (error) {
            console.error('Error al obtener el producto:', error);
            throw new Error(`Error al obtener el producto: ${error.message}`);
        }
    }

    static async updateProduct(id, updatedFields) {
        try {
            const updatedProduct = await Product.findByIdAndUpdate(id, updatedFields, { new: true });
            if (!updatedProduct) {
                throw new Error('Producto no encontrado.');
            }
            return updatedProduct;
        } catch (error) {
            console.error('Error al actualizar el producto:', error);
            throw new Error(`Error al actualizar el producto: ${error.message}`);
        }
    }

    static async deleteProduct(id) {
        try {
            const deletedProduct = await Product.findByIdAndDelete(id);
            if (!deletedProduct) {
                throw new Error('Producto no encontrado.');
            }
            return deletedProduct;
        } catch (error) {
            console.error('Error al eliminar el producto:', error);
            throw new Error(`Error al eliminar el producto: ${error.message}`);
        }
    }
}

export default ProductManager;