import mongoose from "mongoose";

const collection = "products";
const schema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    gender: { type: String, required: true },
    ip_address: { type: String, required: true },
});

const Product = mongoose.model(collection, schema);

export default Product;
