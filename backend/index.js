import 'dotenv/config'
import './database/db.js'
import './routes/api.ai.js'
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import pets from "./routes/api.pets.js"
import users from "./routes/api.users.js"
import aiResponse from "./routes/api.ai.js"
import chat from "./routes/api.chat.js"
import post from "./routes/api.post.js"
import pinecone from "./routes/api.pinecone.js"
import { authMiddleware } from './middleware/auth.middleware.js';
import { rateLimit } from 'express-rate-limit'
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import { create } from './database/models/messageModel.js'


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
app.use("/api/ai", aiResponse)
app.use("/api/chat", chat)
app.use("/api/post", post)
app.use("/api/pinecone", pinecone)

const server = createServer(app);
const io = new Server(server);
io.on('connection', (socket) => {
	console.log('a user connected');
	socket.on('message', async (data) => {
		try {
			console.log('Message received:', data);
			await create(data)
			io.emit('chat message: ', data);
		} catch (error) {
			console.log(error)
		}
		
})
		
});

server.listen(port, () => console.log(`Server is running on port ${port}`));
