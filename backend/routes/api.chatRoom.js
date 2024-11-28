import { Router } from "express";
import {
  createChatRoom,
  getAllChatRooms,
} from "../database/models/chatRoomModel.js";
import { clerkClient } from "./api.users.js";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const result = await createChatRoom(req.body);
    console.log("Room Created: ", result);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json("Error Creating ChatRoom: ", error);
  }
});

router.get("/:userId", async (req, res) => {
  console.log("Get Chat Rooms");
  try {
    const { userId } = req.params;
    const chatRooms = await getAllChatRooms(userId);
    console.log("Chat Rooms: ", chatRooms);
    if (!chatRooms) {
      return res.status(404).json({ error: "Chat Room Not Found" });
    }
    const convert = async (recipients) => {
      const results = [];
      for (let i = 0; i < recipients.length; i++) {
        const user = await clerkClient.users.getUser(recipients[i]);
        if (!user) continue;
        results.push({
            userId: user.id,
            username: user.username,
            email: user.emailAddresses[0].email,
            imageUrl: user.imageUrl
        });
      }
      return results;
    }
    const results = [];
    for (let i = 0; i < chatRooms.length; i++) {
      const recipients = await convert(chatRooms[i].recipients);
      results.push({ ...chatRooms[i], recipients });
    }
    return res.status(200).json(results);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error.message });
  }
});

export default router;
