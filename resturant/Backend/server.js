const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000; // Choose your desired port

app.use(cors());
app.use(bodyParser.json());

// Load menu data from data.json
const menuData = require('./data.json');

// API Endpoints
app.get('/menu', (req, res) => {
  res.json(menuData); 
});

app.post('/order', (req, res) => {
  const orderData = req.body;
  console.log('Order received:', orderData); // Process order data here

  res.json({ message: 'Order placed successfully!' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
