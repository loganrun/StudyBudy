import express from 'express';
const router = express.Router();
import multer from 'multer';
import path from 'path';
import Lectures from '../../models/Lectures.js'; // Assuming ESM syntax
import { Storage } from '@google-cloud/storage';
import Transcript from '../../middleware/transcript.js';
import ffmpeg from 'fluent-ffmpeg';
//import {FFmpeg} from '@ffmpeg/ffmpeg';

const upload = multer({ storage: multer.memoryStorage() });

const storage = new Storage({
  projectId: 'weetime',
  keyFilename: 'weetime-4763db2adbbf.json',
});

const bucketName = 'studybudy';

router.get('/upload', async (req, res) => {
  try {
    const items = await Lectures.find();
    res.json(items);
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ message: 'Error fetching items' });
  }
});

router.post('/upload', upload.single('file'), async (req, res) => {
  // res.send("post route")
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
      res.status(500).send('Stream not on');
    });

    stream.on('finish', async () => {
      const fileUrl = `https://storage.googleapis.com/${bucketName}/${fileName}`;
      //console.log(fileUrl)
      const newTrans = await Transcript(fileUrl)
      console.log(newTrans)
      res.send(`File uploaded successfully: ${fileUrl}`);
    });

    stream.end(req.file.buffer);
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).send('Stream did not end properly');
  }
});

// router.post('/upload', upload.single('file'), async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).send('No file uploaded.');
//     }

//     const fileExtension = path.extname(req.file.originalname);
//     const originalFileName = req.file.originalname.replace(fileExtension, ''); // Remove extension
//     const convertedFileName = `${originalFileName}.wav`; // New filename with .wav extension
//     const file = storage.bucket(bucketName).file(convertedFileName);

//     // 1. Create a temporary file for the uploaded webM
//     const tempFilePath = path.join(__dirname, `temp/${originalFileName}.webm`);
//     const tempFileStream = fs.createWriteStream(tempFilePath);
//     tempFileStream.write(req.file.buffer);
//     tempFileStream.end(); // Wait for writing to finish

//     // 2. Use ffmpeg to convert webM to WAV
//     ffmpeg(tempFilePath)
//       .audioCodec('pcm_s16le') // Set WAV audio format (16-bit signed little-endian PCM)
//       .output(path.join(__dirname, `temp/${convertedFileName}`)) // Output to temporary WAV file
//       .on('end', () => {
//         console.log('WebM converted to WAV successfully');

//         // 3. Upload the converted WAV file to Google Cloud Storage
//         const convertedFileStream = fs.createReadStream(path.join(__dirname, `temp/${convertedFileName}`));
//         const uploadStream = file.createWriteStream({
//           metadata: {
//             contentType: 'audio/wav', // Set content type for WAV
//           },
//         });
//         convertedFileStream.pipe(uploadStream);

//         uploadStream.on('error', (error) => {
//           console.error('Error uploading file:', error);
//           res.status(500).send('Stream not on');
//         });

//         uploadStream.on('finish', async ()  => {
//           fs.unlink(tempFilePath, (err) => { // Delete temporary webM file
//             if (err) console.error(err);
//           });
//           fs.unlink(path.join(__dirname, `temp/${convertedFileName}`), (err) => { // Delete temporary WAV file
//             if (err) console.error(err);
//           });
//           const fileUrl = `https://storage.googleapis.com/${bucketName}/${convertedFileName}`;
//           console.log(fileUrl);
//           const transcription = await Transcript(fileUrl);
//           console.log(transcription);
//           res.send(`File uploaded and converted successfully: ${fileUrl}`);
//         });
//       })
//       .on('error', (error) => {
//         console.error('Error converting webM:', error);
//         res.status(500).send('Conversion failed');
//       })
//       .run();

//   } catch (error) {
//     console.error('Error uploading file:', error);
//     res.status(500).send('Stream did not end properly');
//   }
// });


// router.post('/upload', upload.single('file'), async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).send('No file uploaded.');
//     }

//     const fileExtension = path.extname(req.file.originalname);
//     const fileName = `${Date.now()}${fileExtension}`;
//     const wavFileName = `${Date.now()}.wav`;

//     const file = storage.bucket(bucketName).file(fileName);
//     const wavFile = storage.bucket(bucketName).file(wavFileName);

//     const stream = file.createWriteStream({
//       metadata: {
//         contentType: req.file.mimetype,
//       },
//     });

//     stream.on('error', (error) => {
//       console.error('Error uploading file:', error);
//       res.status(500).send('Stream not on');
//     });

//     stream.on('finish', async () => {
//       const fileUrl = `https://storage.googleapis.com/${bucketName}/${fileName}`;

//       // Convert WebM to WAV using ffmpeg.wasm
//       const loadedFFmpeg = FFmpeg.wasm || (await ffmpeg.load());
//       await loadedFFmpeg({ mainArgs: ['-i', fileUrl, '-vn', '-acodec', 'pcm_s16le', '-ar', '44100', '-ac', '2', `${wavFileName}`] });

//       // Upload the WAV file to the bucket
//       const wavStream = wavFile.createWriteStream();
//       await new Promise((resolve, reject) => {
//         loadedFFmpeg.FS('open', `${wavFileName}`).then(fd => {
//           const fileData = loadedFFmpeg.FS('readFile', fd);
//           wavStream.on('error', reject);
//           wavStream.on('finish', resolve);
//           wavStream.end(fileData);
//         })
//       });

//       const wavFileUrl = `https://storage.googleapis.com/${bucketName}/${wavFileName}`;
//       const transcription = await Transcript(wavFileUrl);
//       console.log(transcription);
//       res.send(`File uploaded and converted successfully: ${wavFileUrl}`);
//     });

//     stream.end(req.file.buffer);
//   } catch (error) {
//     console.error('Error uploading file:', error);
//     res.status(500).send('Stream did not end properly');
//   }
// });

export default router;
