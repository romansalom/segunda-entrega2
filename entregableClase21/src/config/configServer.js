import mongoose from 'mongoose';

const url = 'mongodb+srv://carlos8788:eN8xNDCYsEwjkaDL@e-commerce.nyingmg.mongodb.net/ecommerce?retryWrites=true&w=majority'


const connectToDB = () => {
    try {
        mongoose.connect(url)
        console.log('connected to DB e-commerce')
    } catch (error) {
        console.log(error);
    }
};

export default connectToDB

