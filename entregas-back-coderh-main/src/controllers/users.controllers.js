import {userServices} from '../services/services.js'

const getAllUsers= async (req,res)=>{
    try{
        const users= await userServices.getUsers()
        res.send({status:'success', payload:users})
     }
     catch(error){
         console.log(error)
    }
}

const putUser=async(req,res)=>{
    try{
        const {uid}= req.user._id
        const user= req.body
        const newuser= await userServices.updateUser(uid,user)
        res.send({status:"success", payload: newuser})
        }
        catch(error){
            console.log(error)
        }
}

const deleteUser=async(req,res)=>{
    try{
        const uid= req.user._id
        
        const result= await userServices.deleteUser(uid)
        res.send({status:"success", message: `Se eliminó ${result.first_name}`})
        }
        catch(error){
            console.log(error)
        }
}

export default{
    getAllUsers,
    putUser,
    deleteUser
}