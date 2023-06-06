

import { Router } from "express";
import CartsManager from "../dao/mongo/mangersMongo/cartsManager.js";
const router= Router()
const cartServices= new CartsManager()

  //id de mi carrito cid: 646e45e77d31625d814ec4a9
  //pid: "6467d746f81253d41ad5133f"


// Obtengo todos los carritos
router.get('/',async (req, res) => {
  try{
    const carts = await cartServices.getCarts();
    res.send({status: 'success', payload: carts})
  }
   catch(err){
    console.log(err)
   }
  });
  
  // Obtengo un carrito por ID
  router.get('/:cid', async (req, res) => {
    try{
      const  cid = req.params.cid;
      const cart = await cartServices.getCartById(cid);

     // console.log(JSON.stringify(cart, null, '\t'))
      res.send({status: 'success', payload: cart})
    }
   catch(err){
    console.log(err)
   }
  });
  
  // Creo un nuevo carrito
  router.post('/', async (req, res) => {
    try{
      const {cart}= req.body
     
      const newCart= await cartServices.createCart(cart)
      
      res.send({status: 'success', payload: newCart})
    }
  catch(err){
    console.log(err)
  }
  });
  
  // Agrego un producto al carrito
// id de un carrito: 646e45e77d31625d814ec4a9 y de un producto: 646e8d4231192c6f826b473f


  router.put('/:cid/product/:pid',async (req, res) => {
    try{
      const cid = req.params.cid;
      const pid= req.params.pid;
      
      /*const cartGet = await cartServices.getCartById(cid)
      
      const existingProduct = cartGet.products.find(
        (product) => product._id === pid
      )
      if (existingProduct) {
        
        existingProduct.quantity += 1;
        const cart = await  cartServices.addProductToCart(cid, existingProduct._id)
      }*/
      const cart = await  cartServices.addProductToCart(cid, pid);
      console.log(JSON.stringify(cart,null, '\t'))
      res.send({status: 'success', payload:cart })
      
    }
    catch(err){
      console.log(err)
    }
  });
  
  // Elimino  producto del carrito
  router.delete('/:cid/:pid',async (req, res) => {
    try{
      const { cid, pid } = req.params;
      const cart = cartServices.deleteProductToCart(cid, pid);
      res.send({status: 'success', payload: cart})
    }
    catch(err){
      console.log(err)
    }
  });
  
  // Eliminar un carrito por ID
  router.delete('/carts/:id',async (req, res) => {
    try{
      const { id } = req.params;
      const cart = cartServices.deleteCart(id);
      res.send({status: 'success', payload: cart})
    }
  catch(err){
    console.log(err)
  }
  });
  export default router