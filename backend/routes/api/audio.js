const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegStatic = require('ffmpeg-static');
const Lectures = require('../../models/Lectures')


// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/'); 
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`); 
//   },
// });
//const upload = multer({ storage:storage });

router.get('/upload', (req, res) => res.send('audio Route'));

router.post("/upload", async(req,res) =>{
  const {subject, audio, transcript} = req.body
  const lecture = new Lectures({
    subject,
    audio,
    transcript
  })
  await lecture.save()
  res.json('saved')
})



module.exports = router;