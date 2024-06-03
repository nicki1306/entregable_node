import mongoose, { Mongoose } from "mongoose";
import User from "../dao/models/users.model.js";
import { Router } from "express";
import config from "../config.js";

const router = Router();


router.get("/", async (req, res) => {
    const users = await User.find().lean();
    res.json({ users });
});


router.post("/", async (req, res) => {
    const user = new User(req.body);
    const savedUser = await user.save();
    res.json({ status: "success", savedUser });

});

router.get("/:uid", async (req, res) => {
    const { uid } = req.params
    const user = await User.findOne({ id: uid }).lean()
    res.json({ status: "success", user })
})

router.put("/:uid", async (req, res) => {
    const { uid } = req.params
    const user = await User.findOneAndUpdate({ id: uid }, req.body, { new: true })
    res.json({ status: "success", user })
})


router.delete("/:uid", async (req, res) => {
    const { uid } = req.params
    const user = await User.findOneAndDelete({ id: uid })
    res.json({ status: "success", user })
})



export default router

