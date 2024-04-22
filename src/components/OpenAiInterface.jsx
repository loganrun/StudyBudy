import React, { useState } from 'react';

const OpenAIInterface = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async () => {
    // Make API request to OpenAI with input
    const apiResponse = await fetch('YOUR_OPENAI_API_ENDPOINT', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer YOUR_OPENAI_API_KEY',
      },
      body: JSON.stringify({ prompt: input }),
    });
    const data = await apiResponse.json();
    setResponse(data.choices[0].text.trim());
  };

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Ask Your Computer Tutor</h1>
      <textarea
        className="w-full p-4 border rounded-md mb-4"
        rows="5"
        placeholder="Enter your text here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></textarea>
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded-md mb-4"
        onClick={handleSubmit}
      >
        Submit
      </button>
      {response && (
        <div className="bg-gray-100 p-4 rounded-md">
          <h2 className="text-lg font-bold mb-2">Response:</h2>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default OpenAIInterface;
