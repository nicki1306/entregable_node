import { Router } from "express"
import { __dirname } from "../utils.js"
import ProductManager from "../manager/ProductManager.js"

const pmanager = new ProductManager(__dirname + '/data/products.json')

const router = Router()

router.get("/", async (req, res) => {
    const listaproductos = await pmanager.getProducts({})
    res.render("home", { listaproductos })
})

router.get("/realtimeproducts", async (req, res) => {
    res.render("realTimeProducts")
})

export default router