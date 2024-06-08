import Cart from '../dao/models/carts.model.js';

class CartManager {
    async getCarts(query = {}) {
        try {
            const carts = await Cart.find(query).populate('products.productId');
            return carts;
        } catch (error) {
            console.error('Error al obtener carritos:', error);
            throw error;
        }
    }

    async getCartById(id) {
        try {
            const cart = await Cart.findById(id).populate('products.productId');
            if (!cart) {
                throw new Error('Carrito no encontrado.');
            }
            return cart;
        } catch (error) {
            console.error('Error al obtener el carrito:', error);
            throw error;
        }
    }

    async addCart() {
        try {
            const newCart = new Cart({ products: [] });
            await newCart.save();
            return newCart;
        } catch (error) {
            console.error('Error al agregar el carrito:', error);
            throw error;
        }
    }

    async addProductToCart(cid, pid) {
        try {
            const cart = await Cart.findById(cid);
            if (!cart) {
                throw new Error('Carrito no encontrado.');
            }

            const productIndex = cart.products.findIndex(p => p.productId.toString() === pid);
            if (productIndex !== -1) {
                // Si el producto ya existe en el carrito, incrementar la cantidad
                cart.products[productIndex].quantity++;
            } else {
                // Si el producto no existe en el carrito, agregarlo como un nuevo objeto
                cart.products.push({ productId: pid, quantity: 1 });
            }

            await cart.save();
            return cart;
        } catch (error) {
            console.error('Error al agregar producto al carrito:', error);
            throw error;
        }
    }

    async removeProductFromCart(cid, pid) {
        try {
            const cart = await Cart.findById(cid);
            if (!cart) {
                throw new Error('Carrito no encontrado.');
            }

            const productIndex = cart.products.findIndex(p => p.productId.toString() === pid);
            if (productIndex !== -1) {
                // Si el producto existe en el carrito, removerlo
                cart.products.splice(productIndex, 1);
            }

            await cart.save();
            return cart;
        } catch (error) {
            console.error('Error al remover producto del carrito:', error);
            throw error;
        }
    }

    async deleteCart(cid) {
        try {
            const deletedCart = await Cart.findByIdAndDelete(cid);
            if (!deletedCart) {
                throw new Error('Carrito no encontrado.');
            }
            return deletedCart;
        } catch (error) {
            console.error('Error al eliminar carrito:', error);
            throw error;
        }
    }
}

export default CartManager;
