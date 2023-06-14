import userModel from "../models/user.js";

export default class UserManager {

    getUsers = (params) => {
        try {
            return userModel.find(params).lean();

        } catch (error) {
            return error
        }
    }
    getUsersById = (id) => {
        try {
            return userModel.findById({_id: id})
        } catch (error) {
            return error
        }
    }

    getUsersByEmail = (email) => {
        try {
            return userModel.findOne({email: email})
        } catch (error) {
            return error
        }
    }

    validateUser= (email) => {
        try {
            return userModel.findOne({email:email}, {email:1, first_name:1, last_name:1, password:1, role:1})
        } catch (error) {
            return error
        }
    }
    createUser = (user) => {
        try {

            return userModel.create(user);
        } catch (error) {
            return error
        }
    }
}