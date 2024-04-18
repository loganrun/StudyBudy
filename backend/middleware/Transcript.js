import ffmpeg from 'fluent-ffmpeg';
import ffmpegStatic from 'ffmpeg-static';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import tmp from 'tmp';

dotenv.config();

ffmpeg.setFfmpegPath(ffmpegStatic);

// const outputDirPath = 'path/to/output';
// const wavFilePath = path.join(outputDirPath,'audio.wav');

// Create the output directory if it doesn't exist


async function audioConvert(file) {
  return new Promise((resolve, reject) => {
    tmp.file({ postfix: '.wav' }, async (err, tmpFilePath, fd, cleanupCallback) => {
      if (err) {
        reject(err);
        return;
      }

      const outputDirPath = path.dirname(tmpFilePath);

      ffmpeg()
        .input(`${file}`)
        .audioFrequency(16000)
        .audioChannels(1)
        .audioCodec("pcm_s16le")
        .output(tmpFilePath)
        .on("end", async () => {
          console.log("Conversion finished");
          resolve({ tmpFilePath, cleanupCallback });
        })
        .on("error", (err) => {
          console.error("Error:", err);
          reject(err);
        })
        .run();
    });
  });
}

async function getTranscript(filename) {
  const data = fs.readFileSync(filename);
  const response = await fetch(
    "https://api-inference.huggingface.co/models/facebook/wav2vec2-large-960h-lv60-self",
    {
      headers: { Authorization: `Bearer ${process.env.Hugging_Face}` },
      method: "POST",
      body: data,
    }
  );
  const result = await response.json();
  return result;
}

export default async function transcript(url) {
  try {
    const { tmpFilePath, cleanupCallback } = await audioConvert(url);
    console.log(tmpFilePath);
    const postConvert = await getTranscript(tmpFilePath);
    cleanupCallback(); // Delete the temporary file
    return postConvert;
  } catch (error) {
    console.error(error.message);
  }
}