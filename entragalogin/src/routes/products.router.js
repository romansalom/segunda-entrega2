import { Router } from "express";
import ProductsManager from "../dao/mongo/mangersMongo/productsManager.js";
import productsModel from "../dao/mongo/models/productsModel.js";

const router= Router()
const productsService= new ProductsManager()

router.get('/', async (req, res)=>{
    try{
        const products= await productsService.getProducts()
        res.send({status: "success", payload:products})
    }
    catch(err){
        console.log(err)
    }
})

//pueba de fultreo por category:
router.get('/prueba', async (req,res)=>{
    const {category}= req.query

    const filter= await productsModel.find({},{category: category}).lean()
    
    console.log(filter)
    res.send({status: "succes", payload: filter})
})

router.post('/', async (req,res)=>{
    try{
        const {title, description, price,category, status}= req.body
        if(!title || !description || !price || !category) return res.status(400).send({status: "error", error: "Incompleted values"})
        const product= {
            title,
            description,
            price,
            category
        }
        const result= await productsService.createProduct(product)
        res.sendStatus(201)
    }
    catch(err){
        console.log(err)
    }
})


router.post('/realTimeProducts', async (req,res)=>{
    try{
        const {title, description, price, category}= req.body
        if(!title || !description || !price || !category) return res.status(400).send({status: "error", error: "Incompleted values"})
        const product= {
            title,
            description,
            price,
            category
        }
        const result= await productsService.createProduct(product)
        res.sendStatus(201)

        const allProducts= await productsService.getProducts()
        req.io.emit('productRealTime', allProducts)
    }
    catch(err){
        console.log(err)
    }
})






router.get('/:pid', async (req,res)=>{
    try{
        const {pid}= req.params
        const product= await productsService.getProductBy({_id: pid})
    
        if(!product) return res.status(404).send({status: "error", error: "Product not found"})
    
        res.send({status: "success", payload: product})
    }
    catch(err){
        console.log(err)
    }
} )

router.put('/:pid', async (req,res)=>{
    try{
        const {pid}= req.params
        const updatedProduct= req.body
        const result = await productsService.updateProduct(pid, updatedProduct)
        res.sendStatus(201)
    }
    catch(err){
        console.log(err)
    }
})


router.delete('/:pid', async(req,res)=>{
    try{
        const {pid}= req.params
    await productsService.deleteProduct(pid)
    res.sendStatus(201)
    }
    catch(err){
        console.log(err)
    }
    
})




export default router

//id del producto uno: 6467d746f81253d4lad5133f