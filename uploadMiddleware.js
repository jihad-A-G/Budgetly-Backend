import multer from "multer";

// Create a storage engine
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './images');
    },
    filename: (req, file, cb) => {
      cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    },
  });
  
  const upload = multer({ storage });
  export default upload;