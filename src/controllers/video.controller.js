import asyncHandler from "../middlewares/asynchandler.middleware.js";
import ErrorHandler from "../utils/errorhandler.util.js";

import Video from "../models/video.model.js";
import View from "../models/videoView.model.js";
import User from "../models/user.model.js";



export const createVideo = asyncHandler(async (req, res) => {

  const { title, description, url } = req.body;

  const video = await Video.create({
    title,
    description,
    url
  });

  res.status(201).json({
    success: true,
    video
  });
});



export const getAllVideos = asyncHandler(async (req, res) => {

  const videos = await Video.find();

  res.json({
    success: true,
    count: videos.length,
    videos
  });
});



export const watchVideo = asyncHandler(async (req, res) => {

  const videoId = req.params.id;


  const video = await Video.findById(videoId);
  if (!video) {
    throw new ErrorHandler("Video not found", 404);
  }

  
  const user = await User.findById(req.user.id);
  if (!user) {
    throw new ErrorHandler("User not found", 404);
  }

  
  if (!user.isSubscribed) {
    throw new ErrorHandler("Please subscribe to watch this video", 403);
  }

  
  await View.create({
    userId: user._id,
    videoId: video._id
  });

 
  video.viewsCount += 1;
  await video.save();


  res.json({
    success: true,
    message: "Enjoy the video",
    videoUrl: video.url,
    totalViews: video.viewsCount
  });
});
