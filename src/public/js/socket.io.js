import { Server } from 'socket.io';
import ProductManager from '../../manager/ProductManager.js';

const initSocket = (httpServer) => {
    const io = new Server(httpServer);

    io.on("connection", async (socket) => {
        console.log("Cliente conectado con id:", socket.id);

        try {
            const products = await ProductManager.getProducts();
            socket.emit('productos', products);
        } catch (error) {
            console.error('Error al obtener productos:', error);
            socket.emit('error', 'Error al obtener productos');
        }

        socket.on('addProduct', async (data) => {
            try {
                console.log('Received addProduct event:', data);
                await ProductManager.addProduct(data);
                const updatedProducts = await ProductManager.getProducts();
                io.emit('productosupdated', updatedProducts);
            } catch (error) {
                console.error('Error al agregar producto:', error);
                socket.emit('error', 'Error al agregar producto');
            }
        });

        socket.on("deleteProduct", async (id) => {
            try {
                console.log("ID del producto a eliminar:", id);
                await ProductManager.deleteProduct(id);
                const updatedProducts = await ProductManager.getProducts();
                io.emit("productosupdated", updatedProducts);
            } catch (error) {
                console.error('Error al eliminar producto:', error);
                socket.emit('error', 'Error al eliminar producto');
            }
        });
    });

    return io;
}

export default initSocket;


