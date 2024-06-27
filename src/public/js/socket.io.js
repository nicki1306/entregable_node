import { Server } from 'socket.io';
import ProductManager from '../../manager/ProductManager.js';
import CartManager from '../../manager/CartManager.js';

const initSocket = (httpServer) => {
    const io = new Server(httpServer);

    io.on("connection", async (socket) => {
        console.log("Cliente conectado con id:", socket.id);
        

        try {
            const products = await ProductManager.getProducts({});
            socket.emit('productos', products);
        } catch (error) {
            console.error('Error al obtener productos:', error);
        }

        socket.on('addProduct', async data => {
            try {
                await ProductManager.addProduct(data);
                const updatedProducts = await ProductManager.getProducts({}); 
                io.emit('productosupdated', updatedProducts);
                console.log('Producto agregado');
            } catch (error) {
                console.error('Error al agregar producto:', error);
            }
        });

        socket.on('updateProduct', async ({ id, updatedData }) => {
            try {
                await ProductManager.updateProduct(id, updatedData);
                const updatedProducts = await ProductManager.getProducts({});
                io.emit('productosupdated', updatedProducts);
                console.log('Producto actualizado');
            } catch (error) {
                console.error('Error al actualizar producto:', error);
            }
        });

        socket.on("deleteProduct", async (id) => {
            try {
                await ProductManager.deleteProduct(id);
                const updatedProducts = await ProductManager.getProducts({});
                io.emit("productosupdated", updatedProducts);
                console.log("Producto eliminado");
            } catch (error) {
                console.error('Error al eliminar producto:', error);
            }
        });

        socket.on('getCart', async (cartId) => {
            try {
                const cart = await CartManager.getCartById(cartId);
                socket.emit('cartUpdated', cart);
            } catch (error) {
                console.error('Error al obtener carrito:', error);
            }
        });


        socket.on('addProductToCart', async ({ cartId, productId, quantity }) => {
            try {
                await CartManager.addProductToCart(cartId, productId, quantity);
                const updatedCart = await CartManager.getCartById(cartId);
                io.emit('cartUpdated', updatedCart);
                console.log('Producto agregado al carrito');
            } catch (error) {
                console.error('Error al agregar producto al carrito:', error);
            }
        });


        socket.on('removeProduct', async ({ cartId, productId }) => {
            try {
                await CartManager.removeProductFromCart(cartId, productId);
                const updatedCart = await CartManager.getCartById(cartId);
                io.emit("cartUpdated", updatedCart);
                console.log('Producto eliminado del carrito');
            } catch (error) {
                console.error('Error al eliminar producto del carrito:', error);
            }
        });

        
        socket.on('checkout', async (cartId) => {
            try {
                await CartManager.checkout(cartId);
                io.emit("cartUpdated", null);
                console.log('Checkout realizado');
            } catch (error) {
                console.error('Error en el checkout:', error);
            }
        });
    });

    return io;
}

export default initSocket;





