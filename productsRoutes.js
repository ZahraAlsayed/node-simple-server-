import express from 'express';
import {
  getAllProducts,
  getOneProduct,
  createProduct
}
  from './productsController.js';

const router = express.Router();

router.get('/products',getAllProducts);
router.get('/products/:id', getOneProduct);
router.post('/products', createProduct);

export default router;
