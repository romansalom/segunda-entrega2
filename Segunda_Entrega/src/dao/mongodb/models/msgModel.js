import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    user: { type: String, required: true },
    message: { type: String, required: true },
    msgDate: { type: String, required: false}
});

export const Message = mongoose.model("messagescollection", messageSchema )