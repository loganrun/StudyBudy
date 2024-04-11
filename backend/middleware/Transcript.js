import ffmpeg from 'fluent-ffmpeg';
import ffmpegStatic from 'ffmpeg-static';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

ffmpeg.setFfmpegPath(ffmpegStatic);

const outputDirPath = 'path/to/output';
const wavFilePath = path.join(outputDirPath, 'audio.wav');

// Create the output directory if it doesn't exist


async function audioConvert(file){
    fs.mkdir(outputDirPath, { recursive: true }, (err) => {
        if (err) {
          console.error('Failed to create output directory:', err);
          return;
        }
    })

    ffmpeg()
    .input(`${file}`)
    .audioFrequency(16000)
    .audioChannels(1)
    .audioCodec("pcm_s16le")
    .output(wavFilePath)
    .on("end", async () => {
      console.log("Conversion finished");
    })
    .on("error", (err) => {
      console.error("Error:", err);
    })
    .run();

    return(wavFilePath);
    

}


async function getTranscript(filename) {
	const data = fs.readFileSync(filename);
	const response = await fetch(
		"https://api-inference.huggingface.co/models/facebook/wav2vec2-large-960h-lv60-self",
		{
			headers: { Authorization: "Bearer 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" },
			method: "POST",
			body: data,
		}
	);
	const result = await response.json();
	return result;
}

export default async function transcript(url) {

    const preConvert = await audioConvert(url);
    console.log(preConvert)
    const postConvert = await getTranscript(preConvert)
    return(postConvert)


}