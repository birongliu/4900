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
import { createServer } from 'http';
import { Server } from 'socket.io';
import { sendMessage } from './database/models/messageModel.js'

const port = process.env.PORT || 3001;

const app = express();
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());

const corsOptions = {
	origin: process.env.FRONTEND_URL,
	methods: ["GET", "POST"],
}
app.use(cors(corsOptions));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 50, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  message: "Too many requests",
});
app.use(limiter);
import rooms from "./routes/api.chatRoom.js"
app.use("/api/pets", pets)
app.use("/api/users", users)
app.use("/api/ai", aiResponse)
app.use("/api/chat", chat)
app.use("/api/rooms", rooms)
app.use("/api/post", post)
app.use("/api/pinecone", pinecone)

// Create server and attach Socket.IO
const server = createServer(app);
const io = new Server(server, {
  cors: corsOptions,
});

// Handle socket connection
io.on('connection', (socket) => {
	// const users = {}; //Map userId to socket.id
	// socket.on('connected', async (userId) => {
	// 	users[userId] = socket.id;
	// 	console.log('User connected:', userId);
	// })

	// Listen for incoming messages from client-side
	console.log(socket)
	socket.on('room message', async (data, callback) => {
	try {
		console.log('Received message data:', data);

		// Save message to the database
		/**
		 * {
			roomId: data.roomId,
			senderId: data.senderId,
			reciver: data.reciver,
			data: data.data,
		}
		 */
		const newMessage = await sendMessage({
			roomId: data.roomId,
			senderId: data.senderId,
			reciver: data.reciver,
			data: data.data,
		});

		// Emit the message to all connected clients
		io.emit('room message', newMessage);  // Emit the raw message data
		console.log('Broadcast the message to all connected clients:', newMessage);

		// Acknowledge the message has been sent successfully
		callback({ status: 'success', message: newMessage });
	} catch (error) {
		console.error('Error saving or emitting message:', error);
		socket.emit('error', 'Failed to send the message.');
		callback({ status: 'error', message: 'Failed to send the message.' });
	}
	});

// 	socket.on("private message", async (data, to) => {
// 		recipientSocketId = users[to]
// 		// Save message to the database
// 		const newMessage = await create({
// 			chatId: data.chatId,
// 			senderId: data.senderId,
// 			message: data.message,
// 		});
// 		//send message to specific user
// 		if (recipientSocketId) {
// 			socket.to(recipientSocketId).to(socket.id).emit("private message", {
// 				newMessage,
// 				to,
// 			});
// 			console.log(`Message sent to ${to}: ${content}`)
// 		}else {
//       		console.log(`User ${recipientUserId} is not connected`);
//     	}
//   });
		

	// Handle disconnection
	socket.on('disconnect', () => {
	console.log('User disconnected:', socket.id);
	});
});

server.listen(port, () => console.log(`Server is running on port ${port}`));
