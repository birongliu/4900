import { Schema, model } from "mongoose";

const messageModel = new Schema({
    roomId: String,
    senderId: String,
    message: String,
    createdAt: { type: Date, default: Date.now() }
});

const messages = model("chat", messageModel);


export async function sendMessage(data) {
    const message = await messages.create(data)
    return message;
}


export async function getMessages(roomId) {
    const data = await messages.findAll({
        roomId: { $eq: roomId }
    }).sort({"createdAt": 1})
    if (!data) return null
    return data;
}



