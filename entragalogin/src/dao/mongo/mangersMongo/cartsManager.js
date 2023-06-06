import cartModel from "../models/cartModel.js";
import productsModel from "../models/productsModel.js";
import ProductsManager from "../mangersMongo/productsManager.js";
import mongoose from "mongoose";

const productsService= new ProductsManager()

export default class CartsManager{

createCart=(cart)=>{
    return cartModel.create(cart)
}
 //OCION 2 PARA USAR EL POPULATE AL HACER FIND   
getCarts=()=>{
    return cartModel.find().lean().populate('products.product')
}

getCartById=(cid)=>{
    return cartModel.findById(cid).lean().populate('products.product')
}

deleteCart=(cid)=>{
    return cartModel.findByIdAndDelete(cid)
}

//AGREGO PRODUCT AL CARRITO MEDIANTE REF AL OBJECT ID 
addProductToCart=(cid,pid)=>{
return cartModel.updateOne({_id:cid}, {$push: {products:{product: new mongoose.Types.ObjectId(pid)}}})


}



}