import { Router } from "express";
import { getMessages, sendMessage, update } from "../database/models/messageModel.js";

const router = Router();


router.get('/:id', async (req, res) => {
    try {
        const id  = req.params.id
        const chat = await getMessages(id)
        res.json(chat)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }    
})

router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const chat = await getMessages(id)
        chat.messages.push(req.body)
        const result = await update(id, chat)
        res.json(result)
    }catch (error) {
        res.status(500).send({ message: error.message })
    }   
})

export default router;
