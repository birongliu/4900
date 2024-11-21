import { Router } from "express";
import { createChatRoom, getAllChatRooms } from "../database/models/chatRoomModel.js";

const router = Router();

router.post('/', async (req, res) => {
    try {
        const result = await createChatRoom(req.body)
        console.log('Room Created: ', result)
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json("Error Creating ChatRoom: ", error)
    }
})

router.get('/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const chatRooms = await getAllChatRooms(userId)
        if (!chatRooms) {
            return res.status(404).json({ error: "Chat Room Not Found" })
        }
        return res.status(200).json(chatRooms);

    } catch (error) {
        console.log(error)
        return res.status(400).json({ error: error.message })
    }
})

export default router;