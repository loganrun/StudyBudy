import React from 'react'
import AudioPlayer from './AudioPlayer';

function DisplayLecture({ data}) {
    const {audio, subject, transcript} = data;

    return (
        
        <div className="bg-white rounded-lg shadow-md p-4">
            <AudioPlayer/>
        <div className="flex items-center mb-2">
            <i className="fas fa-volume-up mr-2 text-gray-500"></i> 
            <a href={audio} className="text-blue-500 hover:underline">{subject}</a>
        </div>
        <p className="text-gray-700 overflow-hidden text-ellipsis">{transcript}</p>

        </div>
    );
}

export default DisplayLecture