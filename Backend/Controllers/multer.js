const multer = require('multer');
const path = require('path');
// Configure Multer to handle file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //uploaded images will be stored
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    // Generate a unique filename for the uploaded image
    cb(
      null,
      file.fieldname + '_' + Date.now() + '-' + path.extname(file.originalname)
    );
    // console.log(file.originalname);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
