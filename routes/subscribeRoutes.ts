import express from 'express';
const router = express.Router();

import { isAuth, isAdmin } from '../util';
import { getSubscribes, createSubscibe, deleteSubscribe } from '../controllers/subscribe';

router.get('/', isAuth, isAdmin, getSubscribes);
router.post('/', createSubscibe);
router.delete('/:id', isAuth, isAdmin, deleteSubscribe);

export default router;