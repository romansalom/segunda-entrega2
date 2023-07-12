import RouterPadre from '../router.js'
import productsModel from '../../dao/models/productsModel.js'
import {productsService} from '../../services/services.js'


export default class ProductsView extends RouterPadre{
    init(){
        this.get('/', ["PUBLIC"], async (req,res)=>{
            const { page=1, category, limit: queryLimit}= req.query
    
            const defaultLimit = 6
            const limit = queryLimit ? parseInt(queryLimit) ?? defaultLimit : defaultLimit
    
        
            if(category){
                const productsfilter= await productsService.getProductsTo("category",category)
              // console.log(productsfilter)
                res.render('products',{
                    productsfilter,
                    hasPrevPage: false,
                    hasNextPage: false,
                    productsfilter:productsfilter,
                    css:'products'
                    //cid:cid
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
         css:'products'
         //cid: cid
         })
    }
        })
    }
}