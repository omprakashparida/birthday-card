import cloudinary from "../config/cloudinary.js";

const uploadToCloudinary = async (buffer, options = {}) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(options, (error, result) => {
        if (error) return reject(error);

        resolve(result);
      })
      .end(buffer);
  });
};

export { uploadToCloudinary };