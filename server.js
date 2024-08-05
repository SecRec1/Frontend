const express = require('express');
const cors = require('cors');
const path = require('path');

const port = process.env.PORT || 8080;
const app = express();

// CORS configuration
const corsOptions = {
  origin: '*', // Allows access from any origin
  optionsSuccessStatus: 200 // Fixed property name
};
app.use(cors(corsOptions));

// Serve static files from the "dist" directory
app.use(express.static(path.join(__dirname, '../Frontend/dist')));

// Handle all requests and serve the index.html file
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../Frontend/dist', 'index.html'));
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server started on http://0.0.0.0:${port}`);
});
