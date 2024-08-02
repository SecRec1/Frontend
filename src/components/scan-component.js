import React, { useState, useEffect } from "react";
import { QrReader } from "react-qr-reader";
import { useHistory } from "react-router-dom";

const Scanner = () => {
  const [data, setData] = useState("No result");
  const [error, setError] = useState(null);
  const [cameraPermission, setCameraPermission] = useState(false);
  const history = useHistory();

  useEffect(() => {
    // Check for camera permissions
    navigator.permissions
      .query({ name: "camera" })
      .then((result) => {
        if (result.state === "granted") {
          setCameraPermission(true);
        } else if (result.state === "prompt") {
          // Request permission
          navigator.mediaDevices
            .getUserMedia({ video: true })
            .then((stream) => {
              setCameraPermission(true);
              stream.getTracks().forEach((track) => track.stop());
            })
            .catch((err) => {
              setError(err);
            });
        } else {
          setError(new Error("Camera access denied"));
        }
      })
      .catch((err) => {
        setError(err);
      });
  }, []);

  const handleScan = (result) => {
    if (result) {
      setData(result.text);
      history.push(result.text); // Replace with actual route
      console.log(`Scanned data: ${result.text}`);
    }
  };

  const handleError = (err) => {
    console.error(err);
    setError(err);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>QR Code Scanner</h1>
      {cameraPermission ? (
        <QrReader
          onResult={(result, error) => {
            if (result) {
              handleScan(result);
            }
            if (error) {
              handleError(error);
            }
          }}
          constraints={{ facingMode: "environment" }}
          style={{ width: "300px", margin: "0 auto" }}
        />
      ) : (
        <p>Waiting for camera access...</p>
      )}
      <p>{data}</p>
      {error && <p>Error: {error.message}</p>}
    </div>
  );
};

export default Scanner;
