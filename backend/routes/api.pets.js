import { Router } from "express"
import { findAll, get, create, update } from "../database/models/petModel.js"
import { addPetToUser } from "../database/models/userInfo.js"
import { z } from "zod"

const router = Router()

// example api for pets: http://localhost:3001/api/pets/apple
// will return: { "breed": "dog", "name": "apple", "type": "puppy", "feature": "cute" }
router.get("/:id",  async (req, res) => {
    const id = req.params.id
    console.log("id", id)
    if(!id) return res.json({ data: "invalid id provided", status: 404 })
    const pet = await get(id)
    res.json({ data: pet ? pet : null, status: pet ? 200 : 404 })
})

// example api for pets: http://localhost:3001/api/pets
// will return: [{ "breed": "dog", "name": "apple", "type": "puppy", "feature": "cute" }]
router.get("/", async (req, res) => {
    const pet = await findAll()
    res.json({ data: pet })
})

// example api for pets: http://localhost:3001/api/pets
// with body: { "breed": "dog", "name": "apple", "type": "puppy", "feature": "cute" }
router.post("/", async (req, res) => {
    const validate = z.object({
        breed: z.string(),
        name: z.string(),
        type: z.string(),
        feature: z.string()
    })
    const data = await validate.safeParseAsync(req.body);
    if(data.error) return res.json({ data: data.error.issues, status: 400 })
    const pet = await create(req.body)
    res.json({ data: pet})
})

// router.post("/adopt/:id", async (req, res) => {
//     const petID = req.params.id;
//     const userID = req.body.userID; 

//     try {
//         const pet = await get(petID);
//         if (!pet)
//             return res.status(404).json({ message: "Pet not found" });
//         if (pet.isAdopted)
//             return res.status(400).json({ message: "Pet is already adopted" });

//         await update(petID, { userID: userID, isAdopted: true });
//         await addPetToUser(userID, petID);

//         res.status(200).json({ message: "Pet adopted successfully" });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "An error occurred during the adoption process" });
//     }
// });
export default router
