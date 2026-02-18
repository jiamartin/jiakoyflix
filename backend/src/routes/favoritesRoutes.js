import express from "express";
import { addFavorite, deleteFavorite, getAllFavorites, getFavoriteById } from "../controllers/favoritesController.js";

const router = express.Router();

router.get("/", getAllFavorites);
router.get("/:id", getFavoriteById);
router.post("/", addFavorite);
router.delete("/:id", deleteFavorite);

export default router;