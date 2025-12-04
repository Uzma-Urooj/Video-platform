import mongoose from 'mongoose';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  
  name: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },

  password: {
    type: String,
    required: true
  },

  isSubscribed: {
    type: Boolean,
    default: false
  },

  subscriptionEnd: {
    type: Date
  },

  referredBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },

  wallet: {
    type: Number,
    default: 0
  }

}, { timestamps: true });

userSchema.pre("save", async function (next) {
        if (!this.isModified("password")) {
          return next();
        }
        this.password = await bcrypt.hash(this.password, 10);
      });

      userSchema.methods.comparePassword = async function (enteredPassword) {
        return await bcrypt.compare(enteredPassword, this.password);
      };
      
      userSchema.methods.generateJsonWebToken = function () {
        return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
          expiresIn: process.env.JWT_EXPIRES,
        });
      };

export default mongoose.model('User', userSchema);
