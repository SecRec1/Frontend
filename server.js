const express = require('express');
const cors = require('cors');
const path = require('path');
const https = require('https');
const fs = require('fs');

const port = process.env.PORT || 8080;
const app = express();

// CORS configuration
const corsOptions = {
  origin: '*', // Allows access from any origin
  optionsSuccessStatus: 200 // Fixed property name
};
app.use(cors(corsOptions));

// Serve static files from the "dist" directory
app.use(express.static(path.join(__dirname, 'dist')));

// Handle all requests and serve the index.html file
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Read SSL certificate and key
const sslOptions = {
  key: fs.readFileSync('example-key.pem'),
  cert: fs.readFileSync('example.pem')
};

// Create HTTPS server
https.createServer(sslOptions, app).listen(port, '0.0.0.0', () => {
  console.log(`HTTPS Server started on https://0.0.0.0:${port}`);
});
