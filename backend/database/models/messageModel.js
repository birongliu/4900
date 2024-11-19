import { Schema, model } from "mongoose";

const messageModel = new Schema({
    chatId: String,
    senderId: String,
    message: String,
    createdAt: { type: Date, default: Date.now() }
});

const chat = model("chat", messageModel);


export async function create(data) {
    const result = await chat.create(data)
    return result;
}


export async function getChat(chatID) {
    const data = await chat.findAll({
        chatID: { $eq: chatID }
    }).sort({"createdAt": 1})
    if (!data) return null
    return data;
}

export async function update(id, data) {
    return await chat.updateOne({ chatID: id }, data);
}

