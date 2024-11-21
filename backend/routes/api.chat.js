import { Router } from "express";
import { getMessages } from "../database/models/messageModel.js";

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

export default router;
