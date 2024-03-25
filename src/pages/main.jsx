import { AudioManager } from "../components/AudioManager";
import Transcript from "../components/Transcript";
import { useTranscriber } from "../hooks/use.Transcriber";

function main() {
const transcriber = useTranscriber();

return (
    <div className='flex  min-h-screen'>
        <div className='container flex flex-col  items-center'>
            <h1 className='text-5xl font-extrabold tracking-tight text-white sm:text-7xl '>
                Study Budy
            </h1>
            <div className="bg-white h-28 w-72 mb-8 mt-10">
            <input type="text" class="form-input px-4 py-3 rounded"/>
            </div>
            <AudioManager transcriber={transcriber} />
            <Transcript transcribedData={transcriber.output} />
        </div>
    </div>
);
}

export default main