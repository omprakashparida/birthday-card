import createUploader from "../middleware/upload.middleware.js";

const musicUpload = createUploader({
  allowedMimeTypes: [
    "audio/mpeg",
    "audio/mp3",
    "audio/wav",
    "audio/x-wav",
    "audio/ogg",
  ],

  maxSize: 20 * 1024 * 1024,
});

export default musicUpload;