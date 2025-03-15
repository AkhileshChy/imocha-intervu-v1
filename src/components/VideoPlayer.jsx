import React, { useEffect, useRef, useState } from 'react';

const VideoPlayer = ({ blob, questionNumber, question }) => {
  const videoRef = useRef(null);
  const [videoUrl, setVideoUrl] = useState('');

  useEffect(() => {
    if (blob instanceof Blob) {  // Validate the blob type
      const url = URL.createObjectURL(blob);
      setVideoUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      console.error('Invalid blob provided to VideoPlayer component');
    }
  }, [blob]);

  return (
    <div
    className={`bg-white rounded-lg shadow-md border border-gray-300 overflow-hidden transform transition duration-300 ease-in-out ${
      videoRef?.current?.paused
        ? 'hover:scale-105 hover:shadow-lg hover:border-indigo-600'
        : ''
    }`}
  >
      <div className="p-4 bg-gray-50 border-b">
        <h3 className="text-lg font-semibold">Question {questionNumber}</h3>
      </div>
      <div className="aspect-video">
        {videoUrl ? (
          <video
            ref={videoRef}
            src={videoUrl}
            controls
            className="w-full h-full object-cover"
          />
        ) : (
          <p className="text-red-500 p-4">No valid video available.</p>
        )}
      </div>
    </div>




  );
};

export default VideoPlayer;
