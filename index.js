import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import geminiRoutes from "./routes/geminiRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import roomRoutes from "./routes/roomRoutes.js";

dotenv.config();

const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors());
app.use(express.json());

// // DB
connectDB();

// // Socket.io
const io = new Server(server, {
    cors: {
        origin: "*",
    },
});

// io.on("connection", (socket) => {
//   console.log("Socket connected:", socket.id);

//   socket.on("disconnect", () => {
//     console.log("Socket disconnected:", socket.id);
//   });
// });

// // Test route
app.get("/", (req, res) => {
    res.send("Backend is running 🚀");
});

app.use("/api/auth", authRoutes);
app.use("/api/room", roomRoutes)
app.use("/api/gemini", geminiRoutes);


const PORT = process.env.PORT || 5000;
server.listen(PORT, () =>
    console.log(`Server running on port ${PORT}`)
);
