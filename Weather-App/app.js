const express = require('express');
const app = express();
const path = require('path');

// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
