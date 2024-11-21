import { Schema, model } from "mongoose";

const chatRoomModel = new Schema({
    roomId: String,
    users: [String],
    createdAt: { type: Date, default: Date.now() }
});

const chatRoom = model("chat", chatRoomModel);


export async function createChatRoom(data) {
    const result = await chatRoom.create(data)
    return result;
}


export async function getAllChatRooms(userId) {
    const data = await chatRoom.findAll({
        users: { $contains: userId }
    })
    if (!data) return null
    return data;
}



