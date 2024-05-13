import express from "express"
import { __dirname } from "./utils.js"
import handlebars from "express-handlebars"
import config from "./config.js"
import viewRouter from "./routes/view.router.js"
import productRouter from "./routes/Products.router.js"
import cartRouter from "./routes/carts.router.js"


const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + "/public"))

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