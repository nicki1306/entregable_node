import mongoose from "mongoose";

mongoose.pluralize(null);

const collection = "carts";

const productSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'products', required: true },
    quantity: { type: Number, required: true, default: 1 }
});

const cartSchema = new mongoose.Schema({
    products: { type: [productSchema], required: true },
}, { timestamps: true });

const Cart = mongoose.models.carts || mongoose.model(collection, cartSchema);

export default Cart;
