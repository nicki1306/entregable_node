import { Server } from 'socket.io';
import ProductManager from '../../manager/ProductManager.js';

const initSocket = (httpServer) => {
    let messages = [];

    const io = new Server(httpServer);

    io.on("connection", async (socket) => {
        console.log("Cliente conectado con id:", socket.id)
        
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
    });

    return io;
}

export default initSocket;


