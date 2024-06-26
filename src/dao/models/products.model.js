import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

mongoose.pluralize(null);

const productSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    ip_address: { type: String, required: true },
});

productSchema.plugin(mongoosePaginate);

const Product = mongoose.model('Product', productSchema);

export default Product;

