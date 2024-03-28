import React from 'react'
import AudioPlayer from './AudioPlayer';

function DisplayLecture({ url, title, text }) {

    return (
        <div className="bg-white rounded-lg shadow-md p-4">
            <AudioPlayer/>

        <div className="flex items-center mb-2">
            <i className="fas fa-volume-up mr-2 text-gray-500"></i> 
            <a href={"https://res.cloudinary.com/druxhawb1/video/upload/v1711636936/tb4_xcyuds.mp4"} className="text-blue-500 hover:underline">{"Virus"}</a>
        </div>
        <p className="text-gray-700 overflow-hidden text-ellipsis">{"Some patients will recover without treatment, but most, if left untreated, will eventually die of tuberculosis. Much of the strangeness here is related to the bacterium itself. Microbacterium tuberculosis has an unusually fatty, thick cell wall, which makes it difficult for infection-fighting cells to destroy the bacteria, so instead, the bacteria is surrounded first by one white blood cell and then by many which creates this ball of calcifying tissue called a tubercle. As long as these vaguely spherical tubercles hold the bacteria within them, active disease never develops, but if the bacteria escapes and the immune system isn't strong enough to surround all the new bacteria with tuberculosis, the body can slowly be overwhelmed by infection, eventually leading to death. Now because it takes so long to build the complicated fortress of itself, my go back to tuberculosis has an incredibly slow."}</p>

        </div>
    );
}

export default DisplayLecture