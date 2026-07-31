import multer from "multer";

const storage = multer.memoryStorage();

const createUploader = ({ allowedMimeTypes, maxSize }) => {
  return multer({
    storage,

    limits: {
      fileSize: maxSize,
    },

    fileFilter(req, file, cb) {
      if (allowedMimeTypes.includes(file.mimetype)) {
        return cb(null, true);
      }

      cb(new Error("Unsupported file type"));
    },
  });
};

export default createUploader;