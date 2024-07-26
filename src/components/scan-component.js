import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';

const Scanner = () => {
  const [data, setData] = useState('No result');
  const [error, setError] = useState(null);

  const handleScan = (result) => {
    if (result) {
      setData(result.text);
      console.log(`Scanned data: ${result.text}`);
    }
  };

  const handleError = (err) => {
    console.error(err);
    setError(err);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>QR Code Scanner</h1>
      <QrReader
        onResult={(result, error) => {
          if (result) {
            handleScan(result);
          }
          if (error) {
            handleError(error);
          }
        }}
        constraints={{ facingMode: 'environment' }}
        style={{ width: '300px', margin: '0 auto' }}
      />
      <p>{data}</p>
      {error && <p>Error: {error.message}</p>}
    </div>
  );
};

export default Scanner;
