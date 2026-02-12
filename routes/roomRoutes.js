import express from "express";
import { createRoom, joinRoom } from "../controllers/roomController.js";
import authMiddleware from "../middleware/auth.js";

const roomRoutes = express.Router();

/**
 * Create room (logged-in user)
 */
roomRoutes.post("/create", authMiddleware, createRoom);

/**
 * Join room via URL
 */
roomRoutes.post("/join/:roomId", authMiddleware, joinRoom);

export default roomRoutes;
