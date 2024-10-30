import { Schema, model } from "mongoose";

const messageModel = new Schema({
    chatId: String,
    messageId: String,
    userType: "sender" | "recipient",
    userId: String,
    content: String,
    createdAt: { type: Date, default: Date.now() }
});

const chat = model("chat", chatModel);


export async function create(data) {
    const result = await chat.create(data)
    return result;
}


export async function getChat(chatID) {
    const data = await chat.findOne({
        chatID: { $eq: chatID }
    })
    if (!data) return null
    return data;
}

export async function update(id, data) {
    return await chat.updateOne({ chatID: id }, data);
}

