import 'dotenv/config'
import './database/db.js'
import './routes/api.aiResponse.js'
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import pets from "./routes/api.pets.js"
import users from "./routes/api.users.js"
import aiResponse from "./routes/api.aiResponse.js"
import chat from "./routes/api.chat.js"
import post from "./routes/api.post.js"
import { authMiddleware } from './middleware/auth.middleware.js';
import { rateLimit } from 'express-rate-limit'


const port = process.env.PORT || 3001;

const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use(cors({
    origin: process.env.FRONTEND_URL
}));

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 50, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	message: "Too many requests"
})
app.use(limiter)

app.use("/api/pets", pets)
app.use("/api/users", users)
app.use("/api/aiResponse", aiResponse)
app.use("/api/chat", chat)
app.use("/api/post", post)

app.listen(port, () => console.log(`Server is running on port ${port}`));
