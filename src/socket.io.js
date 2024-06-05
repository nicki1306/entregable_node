import { Server } from 'socket.io';
import ProductManager from './manager/ProductManager.js';

const initSocket = (httpServer) => {
    let messages = [];
    
    const io = new Server(httpServer);

    io.on("connection", async (socket) => {
        console.log("Cliente conectado con id:", socket.id)
        const products = await ProductManager.getProducts({});
        socket.emit('productos', products);
    
        socket.on('addProduct', async data => {
            await ProductManager.addProduct(data);
            const updatedProducts = await ProductManager.getProducts({}); 
            io.emit('productosupdated', updatedProducts);
        });
    
        socket.on("deleteProduct", async (id) => {
            console.log("ID del producto a eliminar:", id);
            const deletedProduct = await ProductManager.deleteProduct(id);
            const updatedProducts = await ProductManager.getProducts({});
            io.emit("productosupdated", updatedProducts);
        });
    });

    return io;
}

export default initSocket;
