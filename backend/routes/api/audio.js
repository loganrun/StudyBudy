const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegStatic = require('ffmpeg-static');


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); 
  },
});
const upload = multer({ storage });


router.post('/upload', upload.single('file'), async (req, res) => {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }
  
    const filePath = path.join(__dirname, 'uploads', req.file.filename);
    const outputPath = path.join(__dirname, 'uploads', `${path.parse(req.file.filename).name}.wav`);
  
    try {
      // Convert WebM to WAV
      await convertToWAV(filePath, outputPath);
      console.log('File converted to WAV successfully!');
  
      res.send('File uploaded and converted successfully!');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error converting file.');
    }
  });

  function convertToWAV(inputPath, outputPath) {
    return new Promise((resolve, reject) => {
      ffmpeg(inputPath)
        .setFfmpegPath(ffmpegStatic.replace(/app\.asar($|\/)/g, 'app.asar.unpacked$1'))
        .outputOptions(['-c:v copy', '-c:a pcm_s16le']) 
        .output(outputPath)
        .on('end', resolve)
        .on('error', reject)
        .run();
    });
  }

module.exports = router;