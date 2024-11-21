import { Router } from "express";
import { createClerkClient } from '@clerk/backend'
import { getUserByID, getUserByName, getFriends, addFriend, create } from "../database/models/userInfo.js"

const router = Router();

router.get('/:userName', async (req, res) => {
  const { userName } = req.params
  const user = await getUserByName(userName)
  if (!user) 
      return res.status(404).json({ error: 'User not found' });
        
  return res.status(200).json({ user });
})

router.post('/', async (req, res) => {
  const data = req.body;
  try {
        await create(data)
        res.json("User saved to database!")
    } catch (error) {
        res.status(500).send({ message: error.message })
    } 
})

router.post('/addFriend', async (req, res) => {
  try {
        const { userId, friendId } = req.body;
        console.log(`Request to add friend: ${userId} -> ${friendId}`);

        if (userId === friendId) {
            return res.status(422).json({ error: "You can't friend yourself." });
        }

        const user = await getUserByID(userId); // This should work if User is defined correctly
        const friend = await getUserByID(friendId);

        if (!user || !friend) {
            return res.status(404).json({ error: "User or friend not found." });
        }

        const existingFriendship = getFriends(userId);

        if (existingFriendship.contains(friendId)) {
            return res.status(422).json({ error: "Friendship already exists." });
        }

        addFriend(user, friend);

        return res.status(200).json({ message: "Friend added successfully.", friendId });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
})

export default router;