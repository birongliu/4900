import { Router } from "express";
import { createClerkClient } from '@clerk/backend'
import { getUserByID, create } from "../database/models/userInfo.js"

const router = Router();

// return a users list
router.get('/', async (req, res) => {
    const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY })
  try {
    // Fetch all users from Clerk
      const response = await clerkClient.users.getUserList()
      const users = response.data
    // Optionally format the user data as needed
    const userList = users.map(user => ({
      id: user.id,
      email: user.emailAddresses[0]?.emailAddress,
      username: user.username,
      createdAt: user.createdAt,
      firstName: user.firstName,
      lastName: user.lastName,
    }));

    res.json(userList);
  } catch (error) {
    console.error('Error fetching user list:', error);
    res.status(500).json({ message: 'Failed to fetch user list' });
  }
});


//check if the user exits in the db
router.get('/:userID', async (req, res) => {
  const userID = req.params.userID
  const response = await getUserByID(userID)
  if (!response) {
    res.json(false)
  } else {
    res.json(true)
  }
})

router.post('/:userID', async(req,res)=>{
  try {
        await create(req.body)
        res.json("success!")
    } catch (error) {
        res.status(404).send({ message: error.message })
    } 
})

export default router;