import { Router } from "express";
import { passportCall } from "../utils.js";

export default class RouterPadre{
    constructor(){
        this.router= Router()
        this.init()
    }

    getRouter(){
      return  this.router
    }
    init(){}


    get(path,policies, ...callbacks){
        this.router.get(path,passportCall('jwt',{strategyType:'jwt'}),this.handlePolicies(policies),this.applyCallbacks(callbacks))
    }
    post(path,policies, ...callbacks){
        this.router.post(path,passportCall('jwt',{strategyType:'jwt'}),this.handlePolicies(policies),this.applyCallbacks(callbacks))
    }

    put(path, policies,...callbacks){
        this.router.put(path, passportCall('jwt',{strategyType:'jwt'}),this.handlePolicies(policies),this.applyCallbacks(callbacks))
    }

    delete(path, policies,...callbacks){
        this.router.delete(path, passportCall('jwt',{strategyType:'jwt'}),this.handlePolicies(policies),this.applyCallbacks(callbacks))
    }

    generateCustomResponse =(req,res,next)=>{
        res.sendSuccess= (message)=>{
            res.send({status:'success', message})
        }
        res.sendSuccessAndPayload=(payload)=>{
            res.send({status:'success', payload})
        }
        res.sendError= (error)=>{
            res.status(500).send({status:'error', error})
        }
        /*si la quiero usear en los end points deberia agregarla como meddleware en las rutas de aqui
           get(path, ...callbacks){
        this.router.get(path,this.generateCustomResponse,this.applyCallbacks(callbacks))
    }*/
        next()
    }

    handlePolicies(policies){
        return(req,res,next)=>{
            if(policies[0]=== 'PUBLIC') return next()
            const user= req.user
            if(user){console.log(`me llega este user en req.user del handlepolicies ${user.name}`)
            }else{ console.log('todavia no llego el user en el req ')} 
            if(policies[0]=== 'NO_AUTH'&&user) return res.status(401).send({status:'error', error: 'no autenticado'})
            
            if(policies[0]=== 'NO_AUTH'&&!user) return next()

            //para las rutas en que el usuario ya tenga q existir:
            if(!user)res.status(401).send({status:error, error: 'no vino el user'})

            //si ya existe el user, y no es una politica publica
            if(!policies.includes(user.role.toUpperCase())) return res.status(403).send({status:'error', error:'forbiden'})

            //si ya cumplio con todo y está dentro de las políticas:
            next()
        }
    }

    applyCallbacks(callbacks){
        return callbacks.map(callback=> async(...params)=>{
            try{
                await callback.apply(this,params)
            }
            catch(error){
                //ya que todos los meddlewares recibidos tienen un (req,res,next), tomo el parametro de la posicion 1 o sea res y mando el status
               /* params[1].status(500).send(error)*///este el el custom error que es el arametro que ocupa el lugar [1]
               console.log(error)
            }
        })
    }

}