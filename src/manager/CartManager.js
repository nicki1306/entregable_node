import Cart from '../dao/models/carts.model.js';

class CartManager {
    async getCarts() {
        try {
            return await Cart.find();
        } catch (error) {
            throw new Error(`Error al obtener los carritos: ${error.message}`);
        }
    }

    async getCartById(cartId) {
        try {
            const cart = await Cart.findById(cartId).populate('products.productId');
            if (!cart) {
                throw new Error('Carrito no encontrado.');
            }
            return cart;
        } catch (error) {
            throw new Error(`Error al obtener el carrito: ${error.message}`);
        }
    }

    async addCart() {
        try {
            const newCart = new Cart({ products: [] });
            await newCart.save();
            return newCart;
        } catch (error) {
            throw new Error(`Error al agregar el carrito: ${error.message}`);
        }
    }

    async addProductToCart(cartId, productId) {
        try {
            const cart = await Cart.findById(cartId);
            if (!cart) {
                throw new Error('Carrito no encontrado.');
            }

            const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);
            if (productIndex !== -1) {
                cart.products[productIndex].quantity++;
            } else {
                cart.products.push({ productId, quantity: 1 });
            }

            await cart.save();
            return cart;
        } catch (error) {
            throw new Error(`Error al agregar el producto al carrito: ${error.message}`);
        }
    }
}

export default CartManager;
