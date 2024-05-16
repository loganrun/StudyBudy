import { AudioManager } from "../components/AudioManager";
//import Transcript from "../components/Transcript";
import { useTranscriber } from "../hooks/use.Transcriber";
import Navbar from "../components/NavBar";

function main() {
const transcriber = useTranscriber();

return (
    <>
     <Navbar/>
    <div className='flex  min-h-screen'>
        <div className='container flex flex-col  items-center'>
            
            {/* <h1 className='text-5xl font-extrabold tracking-tight text-white sm:text-7xl '>
                Study Budy
            </h1> */}
            {/* <div className="h-28 w-72 mb-8 mt-10">
            <input type="text" className="form-input px-4 py-3 rounded"/>
            </div> */}
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center flex-col">
            <AudioManager transcriber={transcriber} />
            </div>
           
            {/* <Transcript transcribedData={transcriber.output} /> */}
        </div>
    </div>
    </>
   
);
}

export default main