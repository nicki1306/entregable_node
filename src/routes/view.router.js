import { Router } from "express"
import { __dirname } from "../utils.js"
import ProductManager from "../manager/ProductManager.js"

const pmanager = new ProductManager(__dirname + './public/data/products.json')

const router = Router()

router.get("/products", async (req, res) => {
    const listaproductos = await pmanager.getProducts({})
    res.render("home", { listaproductos })
})


router.get("/realtimeproducts", async (req, res) => {
    res.render("realTimeProducts")
})


router.get("/carts/:cid", async (req, res) => { 
    const { cid } = req.params
    const carrito = await pmanager.getCartbyId(req.params)
    res.render("carts", { carrito })
})

router.get("/loguin", async (req, res) => {
    res.render("login")
})

router.get("/register", async (req, res) => {
    res.render("register")
})

router.get("/chat", async (req, res) => {
    res.render("chat")
})

router.get("/logout", async (req, res) => { 
    res.render("logout")
})




export default router