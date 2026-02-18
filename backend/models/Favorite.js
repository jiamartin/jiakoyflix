import mongoose from "mongoose";

//Schema Creation
const favoriteSchema = new mongoose.Schema(
    {
        movieID: {
            type: String,
            required: true
        },
        userID: {
            type: String,
            required: true
        }
    },
    { timestamps: true } //createdAt, updatedAt
)

//Model Creation

const Favorite = mongoose.model("Favorite", favoriteSchema)

export default Favorite