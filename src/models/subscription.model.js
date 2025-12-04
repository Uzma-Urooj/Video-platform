import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  plan: String,
  amount: Number,

  startDate: Date,
  endDate: Date

}, { timestamps: true });

export default mongoose.model("Subscription", subscriptionSchema);
