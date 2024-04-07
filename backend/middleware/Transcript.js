import { pipeline } from '@xenova/transformers';
import wavefile from 'wavefile';
import ffmpeg from 'fluent-ffmpeg';
import ffmpegStatic from 'ffmpeg-static';

ffmpeg.setFfmpegPath(ffmpegStatic);

async function bufferConvert(buffer){
    ffmpeg()
    .input(buffer)
    .outputFormat('wav')
    ffmpeg.run((err, buffer) => {
        if  (err){ 
        console.log("Error converting buffer to wav" , err);
        } else {
        console.log('conversion successful');
        return buffer
        }
    });

}
let transcriber = await pipeline('automatic-speech-recognition', 'Xenova/whisper-tiny.en');

export default async function transcript(url) {

    let buffer = Buffer.from(await fetch(url).then(x => x.arrayBuffer()))
    // const ffmpeg= new ffmpegNode()
    // ffmpeg.setInput(buffer)
    // ffmpeg.setOutputFormat('wav')
    const newWav = await bufferConvert(buffer)
    console.log(newWav);
    let wav = new wavefile.WaveFile(newWav);
    wav.toSampleRate(1600)
    let audioData = wav.getSamples();

    if (Array.isArray(audioData)) {
        if (audioData.length > 1) {
        const SCALING_FACTOR = Math.sqrt(2);
    
          // Merge channels (into first channel to save memory)
        for (let i = 0; i < audioData[0].length; ++i) {
            audioData[0][i] = SCALING_FACTOR * (audioData[0][i] + audioData[1][i]) / 2;
        }
        }
        // Select first channel
        audioData = audioData[0];
    }

    let start = performance.now();
    let output = await transcriber(audioData);
    let end = performance.now();
    console.log(`Execution duration: ${(end - start) / 1000} seconds`);
    console.log(output);
    return output;

}