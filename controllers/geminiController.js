import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

export const generateText = async (req, res) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const result = await model.generateContent(req.body.prompt);
        const response = result.response.text();

        res.json({ response });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
