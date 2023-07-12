import {cartsService, productsService} from '../services/services.js'

const getProducts=async(req,res)=>{
    try{
        const products= await productsService.getProducts()
        res.send({status: "success", payload:products})
    }
    catch(err){
        console.log(err)
    }
}


const getProduct= async(req,res)=>{
    try{
        const {pid}=req.params
        const product= await productsService.getProductBy("_id",pid)
        console.log(`se en encontro el producto ${product.description}`)
        res.send({status:'success', payload: product})
    }
    catch(error){
        console.log(error)
    }
}

const addProductCart=async (req,res)=>{
    try{
          
        const cid= req.user.cart[0]._id
        const username= req.user.name
        const pid= req.body.productId

         
        const result= await cartsService.addProductToCart(cid,pid)
        console.log(result)

    res.send({status:"success", 
              message:`se agrego el product ${pid} en el el carrito ${cid} de ${username}`,
              })
    }
    catch(error){
        console.log(error)
    }
}

const postProduct= async(req,res)=>{
    try{
        const {title, description,price,category,code,thumbnail}=req.body
        const product={
            title,
            description,
            price,
            category,
            code,
            thumbnail
        }
        const addProduct= await productsService.createProduct(product)
        res.send({status:'success', message:`Se creó el producto ${product.description}`,payload:addProduct})
    }
    catch(error){
        console.log(error)
    }
}

const putProduct=async(req,res)=>{
    try{
        const {pid}=req.params
        const {title, description,price,category,code,thumbnail}=req.body
        const product={
            title,
            description,
            price,
            category,
            code,
            thumbnail
        }
        const updateProduct= await productsService.updateProduct(pid,product)
        res.send({status:'success', message:`Se modificó ${product.description}`, payload:updateProduct})
    }
    catch(error) {
        console.log(error)
    }
}

export default{
    getProducts,
    getProduct,
    addProductCart,
    postProduct,
    putProduct
}