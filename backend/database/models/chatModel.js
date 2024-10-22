import { Schema, model } from "mongoose";

const chatModel = new Schema({
    chatID: String,
    userID: { type: Schema.Types.ObjectId, ref: "users" },
    messages: [{
        sender: { type: String },
        message: String,
        sendTime: { type: Date, default: Date.now }
    }]
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

