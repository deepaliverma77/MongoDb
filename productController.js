const Product = require('./productModel');

// Get all products
exports.getAllProducts = async (req, res) => {
  if (req.query.name) {
      try {
          const products = await Product.find({});  // Case insensitive search
          return res.send(products);
      } catch (err) {
          return res.status(500).send(err.message);
      }
  }

  try {
      const products = await Product.find();
      res.send(products);
  } catch (err) {
      res.status(500).send(err.message);
  }
};

// Get product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).send('Product not found');
    res.json(product);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Add new product
exports.addNewProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Update product by ID
exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProduct) return res.status(404).send('Product not found');
    res.json(updatedProduct);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Remove product by ID
exports.removeProduct = async (req, res) => {
  try {
    const removedProduct = await Product.findByIdAndRemove(req.params.id);
    if (!removedProduct) return res.status(404).send('Product not found');
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Remove all products
exports.removeAllProducts = async (req, res) => {
  try {
    await Product.deleteMany({});
    res.json({ message: "All products deleted" });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Find products by name
exports.findProductByName = async (req, res) => {
  try {
    const products = await Product.find({ name: new RegExp(req.query.name, 'i') });  // Case insensitive search
    res.json(products);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
