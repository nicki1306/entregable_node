import { Server } from 'socket.io';

const initSocket = (httpServer, pmanager) => {
    let messages = [];
    
    const io = new Server(httpServer);

    io.on("connection", async (socket) => {
        console.log("Cliente conectado con id:", socket.id)
        const products = await pmanager.getProducts({});
        socket.emit('productos', products);
    
        socket.on('addProduct', async data => {
            await pmanager.addProduct(data);
            const updatedProducts = await pmanager.getProducts({}); 
            io.emit('productosupdated', updatedProducts);
        });
    
        socket.on("deleteProduct", async (id) => {
            console.log("ID del producto a eliminar:", id);
            const deletedProduct = await pmanager.deleteProduct(id);
            const updatedProducts = await pmanager.getProducts({});
            io.emit("productosupdated", updatedProducts);
        });
    });

    return io;
}

export default initSocket;
