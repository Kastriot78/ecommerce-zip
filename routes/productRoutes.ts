import express from 'express';
const router = express.Router();
import upload from '../fileUpload';

import { isAdmin, isAuth } from '../util';
import { getProducts, getProduct, createProduct, updateProduct, deleteProduct } from '../controllers/product';

router.get('/', getProducts);
// router.post('/', isAuth, isAdmin, upload.array('images'), createProduct);
router.get('/:id', getProduct);
router.post('/', isAuth, isAdmin, upload.array('images', 10), createProduct);
router.put('/:id', isAuth, isAdmin, upload.array('images', 10), updateProduct);
router.delete('/:id', isAuth, isAdmin, deleteProduct);

export default router;