import { pipeline } from '@xenova/transformers';
import wavefile from 'wavefile';
import ffmpeg from 'fluent-ffmpeg';
import ffmpegStatic from 'ffmpeg-static';
import fs from 'fs';
import path from 'path';

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
    // .input(buffer)
    // .outputFormat('wav')
    // ffmpeg.run((err, buffer) => {
    //     if  (err){ 
    //     console.log("Error converting buffer to wav" , err);
    //     } else {
    //     console.log('conversion successful');
    //     return buffer
    //     }
    // });

}
//let transcriber = await pipeline('automatic-speech-recognition', 'Xenova/whisper-base.en');

export default async function transcript(url) {

    const preConvert = await audioConvert(url);
    console.log(preConvert)
    const postConvert = wavFilePath
    console.log(postConvert)


    // let url = 'https://huggingface.co/datasets/Xenova/transformers.js-docs/resolve/main/jfk.wav';

    // let buffer = Buffer.from(await fetch(url).then(x => x.arrayBuffer()))
    // const ffmpeg= new ffmpegNode()
    // ffmpeg.setInput(buffer)
    // ffmpeg.setOutputFormat('wav')
    //const newWav = await bufferConvert(buffer)
    //console.log(buffer);
    //let wav = new wavefile.WaveFile(buffer);
    //console.log(wav)
    // wav.toSampleRate(1600)
    // let audioData = wav.getSamples();

    // if (Array.isArray(audioData)) {
    //     if (audioData.length > 1) {
    //     const SCALING_FACTOR = Math.sqrt(2);
    
    //       // Merge channels (into first channel to save memory)
    //     for (let i = 0; i < audioData[0].length; ++i) {
    //         audioData[0][i] = SCALING_FACTOR * (audioData[0][i] + audioData[1][i]) / 2;
    //     }
    //     }
    //     // Select first channel
    //     audioData = audioData[0];
    //     //console.log(audioData)
    // }

    // let start = performance.now();
    // console.log(audioData);
    // let output = await transcriber(audioData);
    // let end = performance.now();
    // console.log(`Execution duration: ${(end - start) / 1000} seconds`);
    //console.log(output);
    //return output;

}