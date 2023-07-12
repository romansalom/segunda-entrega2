import {userServices} from '../services/services.js'
import usersControllers from '../controllers/users.controllers.js'
import RouterPadre from './router.js'

export default class UserRouter extends RouterPadre{
    init(){

        this.get('/', ["PUBLIC"],usersControllers.getAllUsers)

      

        this.put('/', ["USER"], usersControllers.putUser)

        this.delete('/',["USER"],usersControllers.deleteUser )
        
    }//cierre del init
}//cierre de la clase