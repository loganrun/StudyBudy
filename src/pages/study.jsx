import React from 'react'
import {useState} from 'react'
import { useLocation } from 'react-router-dom'
import AudioPlayer from '../components/AudioPlayer'
import OpenAiInterface from '../components/OpenAiInterface1'
import Navbar from '../components/NavBar'


function study() {
    const [isOpen, setIsOpen] = useState(false);
    const params = useLocation()
const {url, subject, transcript, date, _id} = params.state;

  return (
<>
    <Navbar />
    <div className="container mx-auto mt-4">
    <h1 className="text-2xl font-bold mb-4">Lesson Review</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 justify-center mt-20 max-w-screen-lg mx-auto">
    
    <div className="bg-white rounded-lg shadow-md p-4" id={_id}>
            <AudioPlayer audioUrl={url}/>
        <div className="flex items-center mb-2">
            <i className="fas fa-volume-up mr-2 text-gray-500"></i> 
            <p  className="text-sky-800 text-xl font-bold">{subject}</p>
            <p className="text-sky-800  mx-6 font-bold">{date}</p>
            
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
    <div>     
    </div>
    </div>
    <textarea 
  class="h-80 overflow-y-auto resize-none border border-gray-300 rounded-md text-sky-800 text-xl font-bold"
  placeholder="Type your Notes"
></textarea>
{/* <div > */}
  
  {/* <div class="bg-gray-800 text-white p-4 w-64">
    <div class="mb-4">
      <h2 class="text-xl font-bold">Chat Bot</h2>
    </div>
    <div>
      
    </div>
  </div> */}

  {/* <!-- Chat Window --> */}
  {/* <div class="flex-1 flex flex-col"> */}
    {/* <!-- Header --> */}
    {/* <div class="bg-gray-700 text-white p-4 flex items-center justify-between">
      <h2 class="text-lg font-bold">Conversation</h2>
      <div>
      </div>
    </div> */}

    {/* <!-- Chat Messages --> */}
    {/* <div class="flex-1 h-96 overflow-y-auto p-4">
      <div class="mb-4">
        <div class="bg-gray-200 p-2 rounded-lg">
          <p class="text-gray-800">Hello! How can I assist you today?</p>
        </div>
      </div>
      <div class="mb-4">
        <div class="bg-blue-500 text-white p-2 rounded-lg self-end">
          <p>I have a question about your product features.</p>
        </div>
      </div>
      <textarea 
  class="flex-1 h-80 bg-[#17191A] overflow-y-auto resize-none border  text-sky-800 text-xl font-bold w-auto "
  placeholder="Type your Notes"
></textarea>
      
    </div> */}

    {/* <!-- Input --> */}
    {/* <div class="bg-gray-200 p-4 ">
      <div class="flex">
        <input
          class="flex-1 rounded-lg p-2 mr-2"
          type="text"
          placeholder="Type your message..."
        />
        <button class="bg-blue-500 text-white rounded-lg px-4 py-2">Send</button>
      </div>
    </div> */}
  {/* </div> */}
{/* </div> */}

    </div>
    <OpenAiInterface/>

    </div>
    </>    
  )
}

export default study