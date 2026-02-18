import Favorite from "../../models/Favorite.js";

export async function getAllFavorites(_, res) {
    try {
        const favorite = await Favorite.find().sort({ createdAt: -1 }); //-1 = newest first
        res.status(200).json(favorite);
    } catch (error) {
        console.error("Error in getAllFavorites controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function getFavoriteById(req, res) {
    try {
        const favorite = await Favorite.findById(req.params.id);
        if (!favorite) return res.status(404).json({ message: "Favorite not found" });
        res.status(200).json(favorite);
    } catch (error) {
        console.error("Error in getFavoriteById controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function addFavorite(req, res) {
    try {
        const { movieID, userID } = req.body;
        const favorite = new Favorite({ movieID, userID });

        const savedFavorite = await favorite.save();
        res.status(201).json(savedFavorite);
    } catch (error) {
        console.error("Error in addFavorite controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function deleteFavorite(req, res) {
    try {
        const deletedFavorite = await Favorite.findByIdAndDelete(req.params.id);
        if (!deletedFavorite) return res.status(404).json({ message: "Favorite not found" });
        res.status(200).json(deletedFavorite);
    } catch (error) {
        console.error("Error in deleteFavorite controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
}