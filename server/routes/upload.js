const express = require('express');
const multer = require('multer');
const path = require('path');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../public/movies'));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

router.post('/', upload.single('file'), (req, res) => {
  try {
    res.status(200).json({ message: 'File uploaded successfully', filename: req.file.filename });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading file', error });
  }
});

module.exports = router;