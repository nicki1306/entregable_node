import { Router } from "express";
import config from "../config";


const router = Router();

router.get("/getcookies", (req, res) => {
    const data = req.cookies
    res.json({
        status: "success",
        data: data  

    })
})  

router.get("/setcookies", (req, res) => {
    const data = req.cookies
    res.json({
        status: "success",
        data: data
    })
})

router.delete("/deletecookies", (req, res) => {
    const data = req.cookies
    res.json({
        status: "success",
        data: data
    })
})



export default router