import express  from "express"; 
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import handlebars from 'express-handlebars'
import config from  './config.js'
import passportStrategies from './config/passport.config.js'
import UserRouter from "./routers/user.router.js";
import SessionRouter from './routers/session.router.js'
import ProductRouter from './routers/products.router.js'
import CartRoute from './routers/cart.router.js'
import __dirname from './utils.js'
import {loginAndRegisterview} from './services/viewsServices/viewsServices.js'
import {productsView} from './services/viewsServices/viewsServices.js'
import {cartView} from './services/viewsServices/viewsServices.js'
import {homeViewRouter} from './services/viewsServices/viewsServices.js'

const app= express()





const port =config.app.PORT
const connection= mongoose.connect(config.mongo.URL)
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(`${__dirname}/public`))
passportStrategies()

//handlebars
app.engine('handlebars',handlebars.engine());
app.set('views',`${__dirname}/views`);
app.set('view engine','handlebars')


//rutas
const userRouter= new UserRouter()
app.use('/api/users', userRouter.getRouter())
const sessionRouter= new SessionRouter()
app.use('/api/session', sessionRouter.getRouter())
const productsRouter= new ProductRouter()
app.use('/api/products', productsRouter.getRouter())
const cartRouter= new CartRoute()
app.use('/api/cart', cartRouter.getRouter())
//rutas de vistas
app.use('/',loginAndRegisterview.getRouter())
app.use('/products',productsView.getRouter())
app.use('/',cartView.getRouter())
app.use('/', homeViewRouter.getRouter())

app.listen(port, ()=> console.log(`listening on ${port} - ${config.mode.mode}`))
