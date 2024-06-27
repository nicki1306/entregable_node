import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

mongoose.pluralize(null);

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    stock: { type: Number, required: true },
    thumbnail: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    status: { type: Boolean, default: true },
    code: { type: String, required: true, unique: true },
});

productSchema.plugin(mongoosePaginate);


const Product = mongoose.model('Product', productSchema);

export default Product;

