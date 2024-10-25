import { GoogleGenerativeAI } from "@google/generative-ai";
import { Router } from "express";
import { findAll } from "../database/models/petModel.js"

const router = Router();
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//feed gemini the new user questionare answer to get user's pet preference
router.post("/", async (req, res) => {
  const json_structure = `[{
        id: string,
        name: string,
        type: string,
        breed: string,
        imgUrl: string,
    }]`;
  // const response = await fetch(`${process.env.BACKEND_URL}/api/pets`)
  // const petData = JSON.stringify(await response.json())
  const petData = await findAll().then(data => JSON.stringify(data))
  const message = req.body.message;
  const prompt = `Analyze the user\'s input to recommend three most relavant dog or cat from the given data , don\`t explain. formatted as follow json: ${json_structure} `
  const result = await model.generateContent([prompt, message, petData])
  const data = result.response.text().replaceAll("```", "").replace("json", "").replaceAll("\n", "").replaceAll(" ", "")
  res.json(JSON.parse(data))
});

export default router;
