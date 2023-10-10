import React, { useState, useEffect, useRef } from "react";
import jsQR from "jsqr";
import Header from "../components/Header";
import { Link } from "react-router-dom";

const QRScanner = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [scanned, setScanned] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [scanningError, setScanningError] = useState(null);
  const [scanData, setScanData] = useState(null);
  const [showScanData, setShowScanData] = useState(false);
  const [scanInterval, setScanInterval] = useState(null);

  const startScan = () => {
    setScanInterval(
      setInterval(() => {
        if (videoRef.current && canvasRef.current) {
          const video = videoRef.current;
          const canvas = canvasRef.current;
          const canvasContext = canvas.getContext("2d");

          if (video.videoWidth === 0 || video.videoHeight === 0) {
            return;
          }

          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          canvasContext.drawImage(video, 0, 0);

          const imageData = canvasContext.getImageData(
            0,
            0,
            canvas.width,
            canvas.height
          );
          const code = jsQR(
            imageData.data,
            imageData.width,
            imageData.height
          );

          if (code) {
            clearInterval(scanInterval);
            setScanned(true);
            setCameraActive(false);
            setScanData(code.data);
            setShowScanData(true);

            setTimeout(() => {
              setScanned(false);
              setScanData(null);
              setShowScanData(false);
              setCameraActive(true);
              startScan();
            }, 2000);
          }
        }
      }, 100)
    );
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
    <div
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL + '../background.gif'})`,
        backgroundSize: "cover",
        minHeight: "100vh",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <Header />
      <div>
        <nav
          className="navbar navbar-expand-lg "
          style={{ backgroundColor: "#072b52" }}
        >
          <div className="container-fluid">
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link
                    to="/scan"
                    className="nav-link active text-white"
                    aria-current="page"
                  >
                    QR Scanner
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/"
                    className="nav-link active text-white"
                    aria-current="page"
                  >
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/emadd"
                    className="nav-link active text-white"
                    aria-current="page"
                  >
                    Add New Employee
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div>
          {cameraActive && (
            <div>
              <video
                id="qr-scanner"
                width="50%"
                height="auto"
                autoPlay
                ref={videoRef}
              />
              <canvas
                id="qr-canvas"
                style={{ display: "none" }}
                ref={canvasRef}
              />
              <br />
              {!scanInterval ? (
                <button className="btn btn-success btn-lg" onClick={startScan}>
                  Start Scan
                </button>
              ) : (
                <button className="btn btn-danger btn-lg" onClick={stopScan}>
                  Stop Scan
                </button>
              )}
            </div>
          )}
          {showScanData && (
            <div>
              <h3>Scanned QR code: {scanData}</h3>
            </div>
          )}
          {scanned && <div>Scanned successfully!</div>}
          {scanningError && <div>Error: {scanningError.message}</div>}
        </div>
      </div>
    </div>
  );
};

export default QRScanner;
