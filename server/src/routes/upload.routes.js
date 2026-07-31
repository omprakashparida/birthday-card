import express from "express";

import imageUpload from "../uploads/image.upload.js";
import musicUpload from "../uploads/music.upload.js";

import {
  uploadImageController,
  uploadMusicController,
} from "../controllers/upload.controller.js";

const router = express.Router();

router.post(
  "/image",
  imageUpload.single("image"),
  uploadImageController
);

router.post(
  "/music",
  musicUpload.single("music"),
  uploadMusicController
);

export default router;