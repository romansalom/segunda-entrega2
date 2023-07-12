import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'

const collection= 'Products'

const schema= new mongoose.Schema({
    title:String,
    description:String,
    price:Number,
    category: String,
    stock:{
        type:Number,
        default: 10
    },
    code: String,
    img: Array,
    status:{
        type: String,
        default:true
    },
    quantity:{
        type: Number,
        default: 1
    }
}, {timestamps:{createdAt: 'created_at', updatedAt: 'updated_at'}}
)

schema.plugin(mongoosePaginate)

const productsModel= mongoose.model(collection, schema)
export default productsModel;