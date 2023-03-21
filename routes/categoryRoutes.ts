import express from 'express';
const router = express.Router();

import { getCategories, getCategory, createCategory, updateCategory, deleteCategory } from '../controllers/category';

router.get('/', getCategories);
router.get('/:id', getCategory);
router.post('/', createCategory);
router.patch('/:id', updateCategory);
router.delete('/:id', deleteCategory);

export default router;