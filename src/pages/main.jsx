import React, { useState } from 'react';
import { AudioManager } from "../components/AudioManager";
import { useDispatch } from 'react-redux';
//import Transcript from "../components/Transcript";
//import { useTranscriber } from "../hooks/use.Transcriber";
import Navbar from "../components/NavBar";
import { addSubject } from '../reducers/lecturesSlice';
import Subject from '../components/Subject';


function main() {

//const transcriber = useTranscriber();
const dispatch = useDispatch();
const [inputValue, setInputValue] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setInputValue(e.target.value);
    console.log(inputValue);
    dispatch(addSubject(inputValue));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== '') {
      setIsSubmitted(true);
    }
  };

  if (isSubmitted) {
    return null; // Hide the form after submission
  }


return (
    <>
     <Navbar id="record"/>
    <div className='flex  min-h-screen'>
        <div className='container flex flex-col  justify-center items-center'>
        <p>Add the topic of the lecture</p>
        <form 
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-lg shadow-lg flex"
      >
        <Subject/>
        
        {/* <input 
          type="text"
          value={inputValue}
          onChange={handleChange}
          className="border border-gray-300 p-2 rounded-l-lg flex-grow mr-6 text-black"
          placeholder="Subject"
        /> */}
        {/* <button
          type="submit"
          disabled={inputValue.trim() === ''}
          className={`p-2 rounded-r-lg bg-blue-500 text-white ${inputValue.trim() === '' ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
        > */}
           <AudioManager  />
        {/* </button> */}
      </form>
            
           
            
           
            
           
            
        </div> 
        
    </div>
    </>
   
);
}

export default main