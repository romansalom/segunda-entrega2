/* MONGOOSE ---------------------------------------- */
import mongoose from 'mongoose';

export async function connection () {
    try {
        await mongoose.connect("mongodb+srv://romanatlas:lote1045@cluster0.xkmhsmh.mongodb.net/?retryWrites=true&w=majority", {
            useNewUrlParser:true,
            useUnifiedTopology: true
        });
        console.log("Conectado a Mongo");
    } catch (error) {
        console.log(error);
    }
}