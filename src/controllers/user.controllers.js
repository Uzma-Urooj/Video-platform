import asyncHandler from '../middlewares/asynchandler.middleware.js';
import User from '../models/user.model.js';
import ErrorHandler from '../utils/errorhandler.util.js';



export const register = asyncHandler(async (req, res) => {

  const { name, email, password, referredBy } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ErrorHandler('Email already registered', 400);
  }

  const user = await User.create({
    name,
    email,
    password,
    referredBy: referredBy || null,
  });

  const token = user.generateJsonWebToken();

  
  res.cookie("token", token, {
    httpOnly: true,
    secure: false,           
    maxAge: 7 * 24 * 60 * 60 * 1000
  });

  res.status(201).json({
    success: true,
    message: "Registered successfully",
    user: {
      id: user._id,
      name: user.name,
      email: user.email
    }
  });
});



export const login = asyncHandler(async (req, res) => {

  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new ErrorHandler('Invalid email or password', 401);
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new ErrorHandler('Invalid email or password', 401);
  }

  const token = user.generateJsonWebToken();

 
  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    maxAge: 7 * 24 * 60 * 60 * 1000
  });

  res.json({
    success: true,
    message: "Login success",
    user: {
      id: user._id,
      name: user.name,
      email: user.email
    }
  });
});


export const logout = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0)
  });

  res.json({
    success: true,
    message: "Logged out successfully"
  });
});




export const getUser = asyncHandler(async (req, res) => {

  const user = await User.findById(req.user.id).select("-password");

  if (!user) {
    throw new ErrorHandler("User not found", 404);
  }

  res.json({
    success: true,
    user
  });
});




export const subscribe = asyncHandler(async (req, res) => {

  const user = await User.findById(req.user.id);

  if (!user)
    throw new ErrorHandler("User not found", 404);

  if (user.isSubscribed)
    throw new ErrorHandler("Already subscribed", 400);

  user.isSubscribed = true;
  user.subscriptionEnd = new Date(
    new Date().setMonth(new Date().getMonth() + 1)
  );

  await user.save();

  if (user.referredBy) {
    const referrer = await User.findById(user.referredBy);
    if (referrer) {
      referrer.wallet += 50;
      await referrer.save();
    }
  }

  res.json({
    success: true,
    message: "Subscription activated",
    expiry: user.subscriptionEnd
  });
});
