const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productController = require('./productController');
const Product = require('./productModel')
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
    res.send('{"message": "Welcome to DressStore Application"}');
});

// Product Routes
app.get('/api/products',async (req,res)=>{try {
    const Products = await Product.find({});
    console.log(Products)
    res.send(Products);
} catch (err) {
    res.status(500).send(err.message);
}
});
app.get('/api/products/:id', productController.getProductById);
app.post('/api/products', productController.addNewProduct);
app.put('/api/products/:id', productController.updateProduct);
app.delete('/api/products/:id', productController.removeProduct);
app.delete('/api/products', productController.removeAllProducts);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

const dbURI = 'mongodb+srv://deepverma1207:oV5Ms1t0UkK4zNV6@cluster0.qqkr6mu.mongodb.net/Marketplace?retryWrites=true&w=majority'; 
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, serverSelectionTimeoutMS: 5000 })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB', err));

