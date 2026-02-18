import express from "express";
import dotenv from "dotenv";

import rateLimiter from "../middleware/ratelimiter.js";
import favoritesRoutes from "./routes/favoritesRoutes.js";
import { connectDB } from "../config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001

connectDB();

app.use(express.json()); // this middleware will parse JSON bodies: req.body
app.use(rateLimiter);

app.use("/api/favorites", favoritesRoutes);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server started on PORT: ", PORT);
    });
});