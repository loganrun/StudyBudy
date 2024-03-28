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
        <p className="text-gray-700 overflow-hidden text-ellipsis">{" term that essentially means our brain's ability to physically change in response to experience. So when we're learning something, whether it's learning information or you know, learning a skill, tiny little connections called signapses form between neighboring neurons in the brain. And the more we do that theme, whether it's information or a skill, the more robust those connections become and the better we get at doing whatever it is. Now what you're looking at here are two neurons that I filmed in a petri dish connecting. Actually this is a petri dish that I was about to throw away but I could say that there are about to connect so I could clear up this video. Now these incredible heads."}</p>

        </div>
    );
}

export default DisplayLecture