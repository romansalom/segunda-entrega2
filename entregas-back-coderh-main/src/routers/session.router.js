import {userServices} from '../services/services.js'
import RouterPadre from './router.js'
import { passportCall} from '../utils.js'
import sessionControllers from '../controllers/session.controllers.js'

export default class SessionRouter extends RouterPadre{

    init(){

        this.post('/register',["PUBLIC"],passportCall('register',{strategyType:'locals'}),sessionControllers.registerUser)

    
        this.post('/login',["NO_AUTH"],passportCall('login',{strategyType:'locals'}),sessionControllers.loginUser)

        


    }//cierre del init
}//cierre de clase