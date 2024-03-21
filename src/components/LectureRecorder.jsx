import React, { useState, useEffect, useRef } from 'react';

function LectureRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedBlobs, setRecordedBlobs] = useState([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.ondataavailable = (event) => {
        setRecordedBlobs([...recordedBlobs, event.data]);
      };
      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error capturing audio:', error);
    }
  };

  const stopRecording = async () => {
    if (isRecording) {
      const mediaRecorder = mediaRecorderRef.current;
      mediaRecorder.stop();
      setIsRecording(false);

      
      const formData = new FormData();
      formData.append('audioBlob', new Blob(recordedBlobs, { type: 'audio/webm' })); // Adjust format as needed
      const response = await fetch('/api/save-recording', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('Recording saved successfully!');
        setRecordedBlobs([]); 
      } else {
        console.error('Error saving recording:', response.statusText);
      }
    }
  };

  const mediaRecorderRef = useRef(null);

  useEffect(() => {
    return () => {
      if (isRecording) {
        const mediaRecorder = mediaRecorderRef.current;
        mediaRecorder.stop();
      }
    };
  }, [isRecording]);

  return (
    <div className="grid mt-40 bg-[#18212F] h-40 max-w-4xl self-center ">
      <button className="text-red-600" onClick={startRecording} disabled={isRecording}>
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </button>
    </div>
  );
}

export default LectureRecorder;