import { Router } from "express";
import { create, update, findAll, findById, getPostbyTitle, findByIdAndDelete } from "../database/models/postModel.js"

const router = Router();

router.post("/", async (req, res) => {
    try {
        await create(req.body)
        res.json("success!")
    } catch (error) {
        res.status(500).send({ message: error.message })
    } 
});

router.get('/', async (req, res) => {
    try {
        const posts = await findAll()
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})

router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id
        const post = await findById(id)
        res.status(200).json(post)
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
})

router.get('/:title', async (req, res) => {
    try {
        const title = req.params.title
        const post = await getPostbyTitle(title)
        res.status(200).json(post)
    }catch (error) {
        res.status(500).send({ message: error.message });
    }
})

router.put('/:id', async (req, res) => {
    try {
        const id  = req.params.id
        const updatedPost = await update(id, req.body)
        res.json(updatedPost)
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const id  = req.params.id
        const result = await findByIdAndDelete(id);
        if (!result) {
            return res.status(404).json({ message: 'Post not found' });
        }
        return res.status(200).send({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
})

router.put('/:id/likePost', async (req, res) => {
    try {
        const id  = req.params.id
        if (!req.body.userId)
            return res.json({ message: 'Unauthenticated' });

        const post = await findById(id);
        const index = post.likes.findIndex((id) => id === String(req.userId));

        if (index === -1) {
            post.likes.push(req.userId);
        } else {
            post.likes = post.likes.filter((id) => id !== String(req.userId));
        }

        const updatedPost = await update(id, post);

        return res.json(updatedPost);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
})

router.put('/:id/commentPost', async (req, res) => {
    try {
        const  id  = req.params.id
        const value = req.body
        console.log("id", id)
        console.log("value", value)

        let post = await findById(id)
        if(!post) return res.status(404).json({ message: 'Post not found' });
        console.log(value)
        post.comments.push(value)
        console.log(post)
        post = await update(id, post)
        res.json(post);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
})

export default router;
