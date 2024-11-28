import { Schema, model } from "mongoose";

const chatRoomModel = new Schema({
  roomId: String,
  recipients: [String],
  messages: [Object],
  createdAt: { type: Date, default: Date.now() },
});

const chatRoom = model("chat", chatRoomModel);

export async function createChatRoom(data) {
  const result = await chatRoom.create(data);
  return result;
}

export async function getAllChatRooms(userId) {
  const data = await chatRoom.find({
    recipients: { $in: [userId] },
  });
  if (!data) return null;
  return data.map((chat) => ({
    roomId: chat.roomId,
    recipients: chat.recipients,
    messages: chat.messages,
    createdAt: chat.createdAt,
  }));
}

export async function sendMessage(ctx) {
  const { roomId, reciver, sender, message } = ctx;
  let chat = await chatRoom.findOne({ roomId: roomId });
  if (!chat) {
    chat = await createChatRoom({
      roomId,
      message: [],
      recipients: [reciver, sender],
    });
    if (message) chat.messages.push({ message, sender });
    await chat.save();
    return chat;
  } 
  console.log("Chat found: ", chat);

  chat.messages.push(message);
  await chat.save();
  return message;
}

/**
 *
 * @param {string} roomId
 * @returns {Promise<Array<{ message: string, sender: string, type: "me" | "other", image: string }>>} messages
 */
export async function getMessages(roomId) {
  const data = await chatRoom.findOne({ where: { roomId: roomId } });
  if (!data) return null;
  return data.messages;
}
