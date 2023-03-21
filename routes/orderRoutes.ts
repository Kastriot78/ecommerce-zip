import express from 'express';
const router = express.Router();

import { isAdmin, isAuth } from '../util';
import { getOrders, getMyOrders, createOrder, deleteOrder } from '../controllers/order';

router.get('/', isAuth, isAdmin, getOrders);
router.get('/my-orders/:userId', isAuth, getMyOrders);
router.post('/', isAuth, createOrder);
router.delete('/:id', isAuth, isAdmin, deleteOrder);

export default router;