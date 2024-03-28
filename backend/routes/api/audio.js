const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegStatic = require('ffmpeg-static');
const Lectures = require('../../models/Lectures')
const fs = require('fs');
const { Readable } = require('stream');
const wav = require('wav');

const convertBlobToWav = (blob) => {
  return new Promise((resolve, reject) => {
    const reader = new Readable();
    reader.push(blob);
    reader.push(null);

    const wavStream = new wav.Writer({
      channels: 1,
      sampleRate: 44100,
      bitDepth: 16,
    });

    reader.pipe(wavStream);

    const chunks = [];

    wavStream.on('data', (chunk) => {
      chunks.push(chunk);
    });

    wavStream.on('end', () => {
      const wavBuffer = Buffer.concat(chunks);
      resolve(wavBuffer);
    });

    wavStream.on('error', (err) => {
      reject(err);
    });
  });
};


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); 
  },
});
const upload = multer({ storage:storage });


router.get('/upload',async (req, res) => {
  try {
    const items = await Lectures.find()
    res.json(items)
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ message: 'Error fetching items' });
  }
});


router.post("/upload",upload.single('file'), async(req,res) =>{
  try {
    const blobData = req.file.buffer;
    const wavBuffer = await convertBlobToWav(blobData);
    const lecture = new Lectures({
      subject: req.body.subject,
      audio: wavBuffer,
      transcript: req.body.transcript
    })
    await lecture.save()
    res.json('saved')
  } catch (error) {
    console.error(error.message)
    res.status(500).send('send error')
  }
})



module.exports = router;