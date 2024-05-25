import express from "express"
import { __dirname } from "./utils.js"
import path from "path"
import { fileURLToPath } from 'url';
import mongoose from "mongoose";
import handlebars from "express-handlebars"
import initSocket from "./socket.io.js";
import config from "./config.js"
import viewRouter from "./routes/view.router.js"
import productRouter from "./routes/Products.router.js"
import cartRouter from "./routes/carts.router.js"


const app = express()
const expressInstance = app.listen(config.PORT, async () => {
    await mongoose.connect(config.MONGO_URL)
    console.log(`Servidor escuchando en http://localhost:${config.PORT}`);
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/static', express.static(path.join(__dirname, 'public')));


//handlebars
app.engine("handlebars", handlebars.engine())
app.set("views", __dirname + "/views")
app.set("view engine", "handlebars")

//rutas
app.use("/api", productRouter)
app.use("/api", cartRouter)
app.use("/", viewRouter)


    //MongoDB

    const socketServer = initSocket(expressInstance);
    app.set('socketServer', socketServer);