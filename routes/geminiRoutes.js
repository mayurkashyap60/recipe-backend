import express from "express";
import { generateText } from "../controllers/geminiController.js";

const geminiRoutes = express.Router();

geminiRoutes.post("/generate", generateText);

export default geminiRoutes;
