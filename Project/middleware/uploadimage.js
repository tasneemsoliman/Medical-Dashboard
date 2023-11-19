const multer = require("multer");
const path = require("path");
//CONFIGRATION FOR MULTER
//we use multer to upload form data

const UPLOAD_DIR="upload/";

const fileUpload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, UPLOAD_DIR);
    },
     // multer saves files without extention 
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  }),
});

  const upload = multer({ fileUpload : fileUpload });

  module.exports = fileUpload;