import React, {useState} from 'react'
import AudioPlayer from './AudioPlayer';
import DateFormatter from './DateFormatter';

function DisplayLecture({ data}) {
    const [isOpen, setIsOpen] = useState(false);
    const {url, subject, transcript, date} = data;
    // const formattedDate = new Date(date)
    // const options ={ year: 'numeric', month: 'long', day: 'numeric' };
    // const newDate = formattedDate.tolocalDateString('en-US', options)
    // console.log(newDate)


    return (
        
        <div className="bg-white rounded-lg shadow-md p-4">
            <AudioPlayer audioUrl={url}/>
        <div className="flex items-center mb-2">
            <i className="fas fa-volume-up mr-2 text-gray-500"></i> 
            <a href={url} className="text-blue-500 hover:underline">{subject}</a>
            <p className="text-blue-500">{date}</p>
            <button className="bg-sky-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Study</button>
        </div>
        <div className="border rounded-md p-4">
    <button
        className="flex justify-between items-center w-full py-2 px-4 bg-rose-600 rounded-md mb-4 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
    >
        <span className="text-lg font-semibold">Review Lecture</span>
        <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`h-6 w-6 transition-transform transform ${isOpen ? 'rotate-180' : 'rotate-0'}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={isOpen ? 'M19 9l-7 7-7-7' : 'M5 15l7-7 7 7'}
        />
        </svg>
    </button>
    {isOpen && (
        <div className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
        <p className="text-gray-700 overflow-hidden text-ellipsis">{transcript}</p>
        </div>
    )}
    </div>
        

        </div>
    );
}

export default DisplayLecture