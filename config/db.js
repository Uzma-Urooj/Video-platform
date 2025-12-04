import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.log("❌ MongoDB connection failed");
    console.error(error.message);
    process.exit(1);  // app band kar dega agar DB connect na ho
  }
};

export default connectDB;
