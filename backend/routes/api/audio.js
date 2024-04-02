const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegStatic = require('ffmpeg-static');
const Lectures = require('../../models/Lectures')
const { Storage } = require('@google-cloud/storage');
const fs = require('fs');
const { Readable } = require('stream');
const wav = require('wav');


const upload = multer({ storage: multer.memoryStorage() });

const storage = new Storage({
  projectId: 'weetime',
  keyFilename: '../../weetime-4763db2adbbf.json'
});

const bucketName = 'studybudy';

pp.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }

    const fileExtension = path.extname(req.file.originalname);
    const fileName = `${Date.now()}${fileExtension}`;
    const file = storage.bucket(bucketName).file(fileName);

    const stream = file.createWriteStream({
      metadata: {
        contentType: req.file.mimetype,
      },
    });

    stream.on('error', (error) => {
      console.error('Error uploading file:', error);
      res.status(500).send('Error uploading file');
    });

    stream.on('finish', async () => {
      await file.makePublic();
      const fileUrl = `https://storage.googleapis.com/${bucketName}/${fileName}`;
      res.send(`File uploaded successfully: ${fileUrl}`);
    });

    stream.end(req.file.buffer);
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).send('Error uploading file');
  }
});

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
    res.json(req.file)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('send error')
  }
})



module.exports = router;