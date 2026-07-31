import createUploader from "../middleware/upload.middleware.js";

const imageUpload = createUploader({
  allowedMimeTypes: [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
    "image/gif",
  ],
  maxSize: 10 * 1024 * 1024,
});

export default imageUpload;