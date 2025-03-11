const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadDir = path.join(__dirname, '../uploads'); 

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
   
    const dir = file.mimetype.startsWith('image') ? 'images' : 'videos';
    const targetDir = path.join(uploadDir, dir);

  
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    
    cb(null, targetDir); 
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);  // Get the file extension
    const filename = Date.now() + ext;  // Use Date.now() to avoid collisions and keep the extension intact
    cb(null, filename);  // Save the file with the unique name
  }
  
});


const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 10,  // 10MB
  },
});

module.exports = upload;
