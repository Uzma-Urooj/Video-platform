import express from "express";
import { createVideo, getAllVideos, watchVideo } from "../controllers/video.controller.js";
import auth from "../middlewares/auth.middleware.js";

const router = express.Router();


router.post("/create", createVideo);


router.get("/list", getAllVideos);


router.post("/watch/:id", auth, watchVideo);

export default router;
