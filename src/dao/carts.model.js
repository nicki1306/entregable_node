import mongoose from "mongoose";

mongoose.pluralize(null);

const collection = "carts";
const schema = new mongoose.Schema({  

    id: { type: Number, required: true, unique: true },
    products: { type: Array, required: true },

})

const model = mongoose.model(collection, schema)

export default model