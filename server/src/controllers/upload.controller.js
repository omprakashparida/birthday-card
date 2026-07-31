import { StatusCodes } from "http-status-codes";

import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import { uploadToCloudinary } from "../services/upload.service.js";

const uploadImageController = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      "No image file uploaded."
    );
  }

  const result = await uploadToCloudinary(req.file.buffer, {
    folder: "birthday-card/images",
  });

  return res.status(StatusCodes.OK).json(
    new ApiResponse(
      StatusCodes.OK,
      {
        imageUrl: result.secure_url,
      },
      "Image uploaded successfully."
    )
  );
});

const uploadMusicController = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      "No music file uploaded."
    );
  }

  const result = await uploadToCloudinary(req.file.buffer, {
    folder: "birthday-card/music",
    resource_type: "video",
  });

  return res.status(StatusCodes.OK).json(
    new ApiResponse(
      StatusCodes.OK,
      {
        musicUrl: result.secure_url,
      },
      "Music uploaded successfully."
    )
  );
});

export {
  uploadImageController,
  uploadMusicController,
};