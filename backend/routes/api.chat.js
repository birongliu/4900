import { Router } from "express";
import { getMessages } from "../database/models/chatRoomModel.js";
const router = Router();

router.get('/:id', async (req, res) => {
    try {
        const id  = req.params.id
        if(!id) return res.status(400).send({ message: "Invalid Room Id" })
        const chat = await getMessages(id)
        if(!chat) return res.status(404).send({ message: "Chat Not Found" })
        res.json(chat)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }    
})

export default router;
