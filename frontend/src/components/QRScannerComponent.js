import React, { useState, useEffect, useRef } from "react";
import jsQR from "jsqr";

const QRScanner = () => {
  const [scanned, setScanned] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [scanningError, setScanningError] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [scanInterval, setScanInterval] = useState(null);

  const startScan = () => {
    setScanInterval(setInterval(() => {
      if (videoRef.current && canvasRef.current) {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const canvasContext = canvas.getContext("2d");

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvasContext.drawImage(video, 0, 0);

        const imageData = canvasContext.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);

        if (code) {
          clearInterval(scanInterval);
          setScanned(true);
          setCameraActive(false);
          alert(`Scanned QR code: ${code.data}`);
        }
      }
    }, 100));
  };

  const stopScan = () => {
    clearInterval(scanInterval);
    setScanInterval(null);
  };

  const handleError = (error) => {
    setScanningError(error);
  };

  useEffect(() => {
    const mediaStreamConstraints = {
      video: {
        facingMode: "environment",
      },
    };

    navigator.mediaDevices
      .getUserMedia(mediaStreamConstraints)
      .then((stream) => {
        setCameraActive(true);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((error) => {
        setScanningError(error);
      });
  }, []);

  return (
    <div>
      {cameraActive && (
        <div>
          <video
            id="qr-scanner"
            width="100%"
            height="100%"
            autoPlay
            ref={videoRef}
          />
          <canvas
            id="qr-canvas"
            style={{ display: "none" }}
            ref={canvasRef}
          />
          {!scanInterval && <button onClick={startScan}>Start Scan</button>}
          {scanInterval && <button onClick={stopScan}>Stop Scan</button>}
        </div>
      )}
      {scanned && <div>Scanned successfully!</div>}
      {scanningError && <div>Error: {scanningError.message}</div>}
    </div>
  );
};

export default QRScanner;
