import mongoose from "mongoose";
const albumSchema = new mongoose.Schema(
  {
    name: String,
    albumId: String,
    likedBy: [
      {
        ref: "users",
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
  },
  { collection: "albums" }
);
export default albumSchema;
