
export default class CartsService{
    constructor(dao){
        this.dao= dao
    }

    createCart=()=>{
        return this.dao.createCart()
    }
     //OCION 2 PARA USAR EL POPULATE AL HACER FIND   
    getCarts=()=>{
        return this.dao.getCarts()
    }
    
    getCartById=(cid)=>{
        return this.dao.getCartById(cid)
    }
    
    deleteCart=(cid)=>{
        return this.dao.deleteCart(cid)
    }
    
    //AGREGO PRODUCT AL CARRITO MEDIANTE REF AL OBJECT ID 
    addProductToCart=(cid,pid)=>{
    return this.dao.addProductToCart(cid,pid)
    
    }
}