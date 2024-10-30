import { Router } from "express";
import { getChat, create, update } from "../database/models/messageModel.js";

const router = Router();

router.post("/", async (req, res) => {
    try {
        await create(req.body)
        res.json("success!")
    } catch (error) {
        res.status(404).send({ message: error.message })
    }
});

router.get('/:id', async (req, res) => {
    try {
        const id  = req.params.id
        const chat = await getChat(id)
        res.json(chat)
    } catch (error) {
        res.status(404).send({ message: error.message })
    }    
})

router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const chat = await getChat(id)
        chat.messages.push(req.body)
        const result = await update(id, chat)
        res.json(result)
    }catch (error) {
        res.status(404).send({ message: error.message })
    }   
})

export default router;
