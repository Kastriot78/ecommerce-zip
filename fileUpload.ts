import multer from "multer";

// Create the multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "images/");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname);
    },
  });
  
  // Create the multer upload configuration
  const upload = multer({ storage: storage });

  export default upload;