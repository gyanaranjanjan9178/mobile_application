const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, productController.getAllProducts);
router.post('/', authMiddleware, productController.createProduct);
router.put('/:id', productController.updateProduct); 
router.get('/:id', authMiddleware, productController.getProductById);
router.delete('/:id', authMiddleware, productController.deleteProduct);
module.exports = router;





