import { Router } from "express";
import { getChat, update, create } from "../database/models/chatModel";

const router = Router();

router.post("/", async (req, res) => {
    await create(req.body)
    res.json("success!")
});

router.get('/:id', async (req, res) => {
    const chat = await getChat(id)
    res.json(chat)
})

router.put('/:id', async (req, res) => {
    await update(id, req.body)
    res.json("success!")
})

export default router;
