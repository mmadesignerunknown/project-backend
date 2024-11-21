const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3000;

// Enable CORS for all origins
app.use(cors());
app.use(bodyParser.json());  // To parse JSON body requests

// Product Data (You can replace this with a real database or GitHub file)
let productData = {
  'Opulent Elegance': { price: 3000, quantity: 50, description: 'A stunning piece', image: 'product1.jpg' },
  'Elegant Charm': { price: 1500, quantity: 50, description: 'A classic beauty', image: 'product2.jpg' }
};

// Get Product Data
app.get('/api/products', (req, res) => {
  res.json(productData);
});

// Update Product Quantity (after an order is placed)
app.post('/api/update-quantity', (req, res) => {
  const { productName, quantityOrdered } = req.body;

  if (productData[productName]) {
    const newQuantity = productData[productName].quantity - quantityOrdered;
    if (newQuantity >= 0) {
      productData[productName].quantity = newQuantity;
      res.json({ success: true, message: 'Quantity updated', remainingQuantity: newQuantity });
    } else {
      res.status(400).json({ success: false, message: 'Not enough stock available' });
    }
  } else {
    res.status(404).json({ success: false, message: 'Product not found' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
