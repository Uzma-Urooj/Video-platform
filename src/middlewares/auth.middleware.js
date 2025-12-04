import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import ErrorHandler from "../utils/errorhandler.util.js"; 

const auth = async (req, res, next) => {
  try {
    
    const token =
      req.cookies?.token ||
      req.headers.authorization?.split(" ")[1];

    if (!token) return next(new ErrorHandler("Login first", 401));

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = await User.findById(decoded.id);

    if (!req.user) return next(new ErrorHandler("User not found", 401));

    next();

  } catch (error) {
    next(new ErrorHandler("Invalid or expired token", 401));
  }
};

export default auth;
