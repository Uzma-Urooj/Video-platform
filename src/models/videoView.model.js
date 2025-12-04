import mongoose from "mongoose";

const viewSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  videoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Video"
  },

  watchedAt: {
    type: Date,
    default: Date.now
  }

});

export default mongoose.model("View", viewSchema);
