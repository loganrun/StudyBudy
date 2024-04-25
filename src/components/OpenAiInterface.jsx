import React, { useState } from 'react';
import axios from 'axios';

const OpenAIInterface = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  

  const handleSubmit = async () => {
    // Make API request to OpenAI with input
    console.log(input)
    const apiResponse = await axios.post("http://localhost:3000/api/chat/chat", {

      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        prompt: `${input}`,
      },
    });
    const data = apiResponse.data;
    console.log(data)
    setResponse(data.content);
  };

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Ask Your Study Budy</h1>
      <textarea
        className="w-full p-4  rounded-md mb-4  bg-[#1D1F20] "
        rows="5"
        placeholder="Enter your text here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></textarea>
      <button
        className="bg-rose-600 text-white py-2 px-4 rounded-md mb-4"
        onClick={handleSubmit}
      >
        Submit
      </button>
      {response && (
        <div className=" p-4 rounded-md  bg-[#1D1F20]">
          <h2 className="text-lg font-bold mb-2">Response:</h2>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default OpenAIInterface;
