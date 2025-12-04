import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: String,
  description: String,
  url: String,

  viewsCount: {
    type: Number,
    default: 0
  }

}, { timestamps: true });

export default mongoose.model("Video", videoSchema);
