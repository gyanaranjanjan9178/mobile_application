
const db = require('../models');
const Product = db.Product;


exports.createProduct = async (req, res) => {
  try {
    console.log('Received body:', req.body);

    const { title, description, image } = req.body;
    const product = await Product.create({ title, description, image });

    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, image } = req.body;

    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.title = title;
    product.description = description;
    product.image = image;

    await product.save();

    return res.json({ message: 'Product updated successfully', product });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};


exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await product.destroy();
    return res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

