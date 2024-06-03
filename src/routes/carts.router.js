import { Router } from "express"
import CartManager from "../manager/CartManager.js"
import config from "../config.js"
import { __dirname } from "../utils.js"
import cartsModel from "../dao/models/carts.model.js"
import UsersModel from "../dao/models/users.model.js"
import productsModel from "../dao/models/products.model.js"

const manager = new CartManager(__dirname + '/src/public/data/carts.json')
const router = Router()


router.get("/", async (req, res) => {

    const carts = await cartsModel.find()
        .populate({ path: 'products', model: 'Products' })
        .populate({ path: 'id', model: 'Users' })
        .lean()
    res.json({ carts })

})

router.get("/carts", async (req, res) => {
    const carrito = await manager.getCarts()
    res.json({ carrito })
})

router.get("/carts/:cid", async (req, res) => {
    const carritofound = await manager.getCartbyId(req.params)
    res.json({ status: "success", carritofound })
})


router.post("/carts/", async (req, res) => {
    const newcart = await manager.addCart();
    res.json({ status: "success", newcart });
});

router.post("/carts/:cid/products/:pid", async (req, res) => {
    try {
        const cid = parseInt(req.params.cid);
        const pid = parseInt(req.params.pid);

        await manager.addProductToCart(cid, pid);
        res.json({ status: "success", message: "Product added to cart successfully." });
    } catch (error) {
        console.error("Error adding product to cart:", error);
        res.status(500).json({ status: "error", message: "Failed to add product to cart." });
    }
});


export default router