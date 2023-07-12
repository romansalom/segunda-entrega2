import RouterPadre from '../routers/router.js'
import {cartsService, productsService} from '../services/services.js'
import productsControllers from '../controllers/products.controllers.js'


export default class ProductRouter extends RouterPadre{
    init(){

        this.get('/',["PUBLIC"],productsControllers.getProducts)

        //addproduct al carrito
        this.post('/', ["USER"], productsControllers.addProductCart)


    this.get('/:pid', ["PUBLIC"],productsControllers.getProduct )

    this.post('/cargoproduct',["ADMIN"],productsControllers.postProduct)


    this.put('/:pid',["ADMIN"],productsControllers.putProduct )

    this.delete('/:pid',["ADMIN"],async (req,res)=>{
        const {pid}= req.params
        const deleteProduct= await productsService.deleteProduct(pid)
        res.send({status:'success', message: 'Producto eliminado', payload: deleteProduct})
    })

    //esto es para cargarlos todos de una para mi
    this.post('/cargomuchos', ["PUBLIC"], async (req,res)=>{
       try{
        const products= req.body
       const result= await productsService.createProducts(products)
       res.send({status:"success", message:"productos agregados", payload: result})
       }
       catch(error){
        console.log(error)
       }
    })



    }//cierre del init
}