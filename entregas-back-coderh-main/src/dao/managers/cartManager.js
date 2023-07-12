import cartModel from "../models/cartModel.js";
import productsModel from "../models/productsModel.js";
import ProductsManager from "../managers/productsManager.js";
import mongoose from "mongoose";

const productsService= new ProductsManager()

export default class CartsManager{

createCart=()=>{
    return cartModel.create({products:[]})
}
 //OCION 2 PARA USAR EL POPULATE AL HACER FIND   
getCarts=()=>{
    return cartModel.find().lean().populate('products')
}

getCartById=(cid)=>{
    return cartModel.findById(cid).lean().populate('products')
}

deleteCart=(cid)=>{
    return cartModel.findByIdAndDelete(cid)
}

//fucion de addproduct tu cart
addProductToCart = async (cid, pid) => {
    const product = await productsModel.findById(pid)
  
    if (!product) {
      console.log('No encontró el product'); 
    } 
    const cart = await cartModel.findById(cid)
    if (!cart) {
      console.log('no encontró al carrito')
    }
  
    cart.products.push(pid)
  
    await cart.save()
    return cart
  };





}