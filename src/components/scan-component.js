// import React, { useState } from "react";
// import  QrScanner  from "react-qr-scanner";
// import { useNavigate } from "react-router-dom";

// const Scanner = () => {
//   const [data, setData] = useState("No result");
//   const [error, setError] = useState(null);
//   const history = useNavigate();

//   const handleScan = (result) => {
//     if (result) {
//       // Store the result data
//       setData(result.text);

//       // Assuming the QR code contains a URL, navigate to it
//       // Make sure result.text is a valid URL or route
//       if (isValidURL(result.text)) {
//         history.push(result.text);
//         console.log(`Navigating to: ${result.text}`);
//       } else {
//         console.error("Scanned data is not a valid URL.");
//       }
//     }
//   };

//   const handleError = (err) => {
//     console.error(err);
//     setError(err);
//   };

//   // Simple URL validation
//   const isValidURL = (string) => {
//     try {
//       new URL(string);
//       return true;
//     } catch (_) {
//       return false;
//     }
//   };

//   return (
//     <div style={{ textAlign: "center" }}>
//       <h1>QR Code Scanner</h1>
//       <QrScanner
//         onResult={(result, error) => {
//           if (result) {
//             handleScan(result);
//           }
//           if (error) {
//             handleError(error);
//           }
//         }}
//         constraints={{ facingMode: "environment" }}
//         style={{ width: "300px", margin: "0 auto" }}
//       />
//       <p>{data}</p>
//       {error && <p>Error: {error.message}</p>}
//     </div>
//   );
// };

// export default Scanner;
