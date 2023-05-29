import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const productSchema = new mongoose.Schema({
    id:{ type: Number, required: false, index: true },
    title: { type: String, required: true },
    thumbnail: { type: String, required: true },
    price: { type: Number, required: true },
    code: {type: String, required: true},
    description: {type: String, required: true},
    category: {type: String, required: true},
    stock: {type: Number, required: true},
});

productSchema.plugin(mongoosePaginate);

export const Product = mongoose.model("productscollection", productSchema )