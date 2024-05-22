import express from "express"
import { __dirname } from "./utils.js"
import path from "path"
import { fileURLToPath } from 'url';
import handlebars from "express-handlebars"
import config from "./config.js"
import viewRouter from "./routes/view.router.js"
import productRouter from "./routes/Products.router.js"
import cartRouter from "./routes/carts.router.js"


const app = express()

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://nickiicn:<nicole1306>@cluster0.sxitpsr.mongodb.net/');

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('mongodbVSCodePlaygroundDB');

//app.use(express.static(__dirname + "/public"))

//handlebars
app.engine("handlebars", handlebars.engine())
app.set("views", __dirname + "/views")
app.set("view engine", "handlebars")

//rutas
app.use("/api", productRouter)
app.use("/api", cartRouter)
app.use("/", viewRouter)


    app.listen(config.PORT, () => {
        console.log(`Servidor escuchando en http://localhost:${config.PORT}`);
    });