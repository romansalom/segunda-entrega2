import RouterPadre from '../../routers/router.js'
import productsModel from '../../dao/models/productsModel.js'
import {productsService} from '../../services/services.js'


export default class HomeViewRouter extends RouterPadre{
    init(){
        this.get('/home', ["PUBLIC"], async (req,res)=>{

            const { page=1, limit: queryLimit}= req.query 
            const defaultLimit = 3
            const limit = queryLimit ? parseInt(queryLimit) ?? defaultLimit : defaultLimit
            

            const {docs, totalPages, page: currentPage}=
            await productsModel.paginate({}, {page, limit, lean:true})
            const products= docs
            
            const hasNextPage = currentPage < totalPages;
            const hasPrevPage = currentPage > 1;
            const prevPage = hasPrevPage ? currentPage - 1 : null;
            const nextPage = hasNextPage ? currentPage + 1 : null;
            
            
            res.render('home',{
                css:'home',
                products,
             page:currentPage, 
             hasNextPage,
             hasPrevPage,
             prevPage,
              nextPage,
            })
        })

    }//cierre del init
}