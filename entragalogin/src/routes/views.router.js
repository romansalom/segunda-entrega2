import { Router } from "express";
import ProductsManager from "../dao/mongo/mangersMongo/productsManager.js";
import CartsManager from '../dao/mongo/mangersMongo/cartsManager.js'
import productsModel from "../dao/mongo/models/productsModel.js";
import cartModel from "../dao/mongo/models/cartModel.js";

const router= Router()
const productsService= new ProductsManager()
const cartsServices= new CartsManager()

//todos los products paginados o por category
router.get('/products', async(req,res)=>{
    const { page=1, category, limit: queryLimit}= req.query
    
    const defaultLimit = 3
    const limit = queryLimit ? parseInt(queryLimit) ?? defaultLimit : defaultLimit
    
    const {cid}= req.params
    if(!cid){
        const newCart= await cartsServices.createCart()
        const cid= newCart._id
    }


    if(category){
        const productsfilter= await productsModel.find({category: category}).lean()
        res.render('products',{
            products: productsfilter,
            hasPrevPage: false,
            hasNextPage: false,
            cid:cid
        })
    }else{

        const {docs, totalPages, page: currentPage}=
        await productsModel.paginate({}, {page, limit, lean:true})
        const products= docs
        
         const hasNextPage = currentPage < totalPages;
        const hasPrevPage = currentPage > 1;
        const prevPage = hasPrevPage ? currentPage - 1 : null;
        const nextPage = hasNextPage ? currentPage + 1 : null;
        
        res.render('products', 
        {products,
         page:currentPage, 
         hasNextPage,
         hasPrevPage,
         prevPage,
         nextPage,
         cid: cid
         })
    }
    
} )

//registe view
router.get('/register', (req, res)=>{
    res.render('register')
})

//login view
router.get('/login', (req,res)=>{
    res.render('login')
})

//realTimeProducts

router.get('/realTimeProducts', async (req,res)=>{
    res.render('realTimeProducts')

})

// vista del carrito:

router.get('/carts/:cid', async (req,res)=>{
    const {cid}= req.params

    const cart= await cartsServices.getCartById(cid)
    res.render('cart',{cart})
})
//pid de un carrito 647027372ffaefb0e5b10016



/*
//chat lo tengo que sacar
router.get('/chat', async(req,res)=>{
    res.render('chat')
})*/

export default router