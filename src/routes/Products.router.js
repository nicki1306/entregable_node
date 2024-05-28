import { Router } from "express"
import ProductManager from "../manager/ProductManager.js"
import { __dirname } from "../utils.js"
import config from "../config.js"
import productsModel from "../dao/models/products.model.js"

const manager = new ProductManager(__dirname + '/public/data/products.json')

const router = Router()



router.get("/products", async (req, res) => {
    const Products = await productsModel.find()
    const products = await manager.getProducts(req.query)
    res.json({ products })
})


router.get("/products/:pid", async (req, res) => {
    const { pid } = req.params

    const product = await productsModel.findOne({ id: pid }).lean()
    const productfind = await manager.getProductById(req.params);
    res.json({ status: "success", productfind });
});

router.post("/products", async (req, res) => {
    const socketServer = req.app.get("socketServer")
    socketServer.emit("newProduct", req.body);
    const newproduct = await manager.addProduct(req.body);
    res.json({ status: "success", newproduct });
});

router.put("/products/:pid", async (req, res) => {
    const id = parseInt(req.params.pid)
    const product = await productsModel.findOne({ id: id })
    const updatedproduct = await manager.updateProduct(req.params, req.body);
    res.json({ status: "success", updatedproduct });
});


router.delete("/products/:pid", async (req, res) => {
    const id = parseInt(req.params.pid)
    const deleteproduct = await manager.deleteProduct(id);
    res.json({ status: "success", deleteproduct });
});


export default router