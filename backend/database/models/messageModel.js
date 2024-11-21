import { randomUUID } from "crypto";
import { Schema, model } from "mongoose";

const messageModel = new Schema({
    roomId: String,
    recipients: [String],
    messages: [Object],
});

const messages = model("messages", messageModel);


export async function sendMessage(ctx) {
    const {
			roomId,
			senderId,
			reciver,
			data
		} = ctx
    let message = await messages.findOne({ 
        where: {
            roomId: roomId
        }
    })
    /**
     * sender - me
     * reciver - you
     */
    if (!message) {
        message = await messages.create({
            roomId: "2",
            message: [],
            recipients: [reciver, senderId]
        })
        return message;
    } else {
        message.messages.push(data)
        await message.save()
    }
    return message;
}


export async function getMessages(roomId) {
    const data = await messages.findAll({
        roomId: { $eq: roomId }
    }).sort({"createdAt": 1})
    if (!data) return null
    return data;
}



