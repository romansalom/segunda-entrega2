//ruteo absoluto
import {fileURLToPath} from 'url'
import {dirname} from 'path'
const __filename= fileURLToPath(import.meta.url)
const __dirname= dirname(__filename)
export default __dirname



/////////////////encripto contraseña
import bcrypt from 'bcrypt';
//creo la password
export const createHash = async(password) => {
    
    const salts = await bcrypt.genSalt(10)
    return bcrypt.hash(password,salts);
}
// funcion para comparar la password q ingresa con la encriptada
export const validatePassword = (password, hashedPassword) => bcrypt.compare(password,hashedPassword);


//////////////jwt
import jwt from 'jsonwebtoken'
export const generateToken= (user)=>{
    const token= jwt.sign(user,'jwtSecret', {expiresIn: '24h'})
    return token
}


//funcion de passportCall
import passport from 'passport'
export const passportCall = (strategy,options={}) =>{
    return async(req,res,next) =>{
        passport.authenticate(strategy,(error,user,info)=>{
            if(error) return next(error);
            if(!options.strategyType){
                console.log(`Route ${req.url} no se definió la strategyType`);
                return res.sendServerError();
            }
            if(!user) {
                
                switch(options.strategyType) {
                    case 'jwt':
                        req.error = info.message?info.message:info.toString;
                        return next();
                    case 'locals':
                        return res.send(info.message?info.message:info.toString())
                }
            }
            req.user = user;
            next();
        })(req,res,next);
    }
}

//funcion que extra el token de cookie y despues la uso en la estrategia de jwt
export const cookieExtractor = (req) =>{
    let token = null; //aca viene el token... Si lo encuentra
    if(req&&req.cookies) {
        token = req.cookies['authToken']
    }
    return token;
}
