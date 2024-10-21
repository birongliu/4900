import { Router } from "express";
import { update, findAll, getPostbyTitle } from "../database/models/postModel.js"

const router = Router();

router.post("/", async (req, res) => {
    await create(req.body)
    res.json("success!")
});

router.get('/', async (req, res) => {
    const posts = await findAll()
    res.json(posts)
})

router.get('/:title', async (req, res) => {
    const post = await getPostbyTitle(title)
    res.json(post)
})

router.put('/:id', async (req, res) => {
    await update(id, req.body)
    res.json("success!")
})

export default router;
