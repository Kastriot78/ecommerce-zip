import express from 'express';
const router = express.Router();

import { isAdmin, isAuth } from '../util';
import { getColors, createColor, updateColor, deleteColor } from '../controllers/color';

router.get('/', isAuth, isAdmin, getColors);
router.post('/', isAuth, isAdmin, createColor);
router.put('/:id', updateColor);
router.delete('/:id', isAuth, isAdmin, deleteColor);

export default router;