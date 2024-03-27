import { useEffect, useRef, useState } from "react";

const TakePic = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [mediaStream, setMediaStream] = useState(null);

  useEffect(() => {
    startCamera(); // Automatically start the camera when the component mounts
  }, []); // Empty dependency array ensures the effect runs only once

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
      {/* No need for buttons to start and stop the camera */}
      <button onClick={captureImage}>Capture Image</button>
      <video
        ref={videoRef}
        width="100%"
        style={{ height: "calc(100vh - 96px)", objectFit: "contain" }} // Set the height dynamically
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
