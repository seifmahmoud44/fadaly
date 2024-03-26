import React, { useEffect, useRef, useState } from "react";

const TakePic = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [mediaStream, setMediaStream] = useState(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      videoRef.current.onloadedmetadata = () => {
        videoRef.current.play(); // Ensure the video is ready before playing
      };
      setMediaStream(stream);
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const stopCamera = () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach((track) => track.stop());
      setMediaStream(null);
    }
  };

  const captureImage = () => {
    const context = canvasRef.current.getContext("2d");
    context.drawImage(videoRef.current, 0, 0, 300, 200); // Adjust dimensions as needed
    const imageData = canvasRef.current.toDataURL("image/png");
    console.log("Captured image:", imageData);
  };

  return (
    <div>
      <button onClick={startCamera}>Start Camera</button>
      <button onClick={stopCamera}>Stop Camera</button>
      <button onClick={captureImage}>Capture Image</button>
      <video
        ref={videoRef}
        width="100%"
        style={{ width: "100%", height: "100vh", objectFit: "contain" }}
        autoPlay
        playsInline
      ></video>
      <canvas
        ref={canvasRef}
        style={{ display: "none" }}
        width="300"
        height="200"
      ></canvas>
    </div>
  );
};

export default TakePic;
