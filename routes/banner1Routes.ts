import express from 'express';
const router = express.Router();
import { isAuth, isAdmin } from '../util';
import upload from '../fileUpload';
import { getBanner1All, getBanner1, createBanner, updateBanner1, deleteBanner1 } from '../controllers/banner1';

router.get('/', getBanner1All);
router.get('/:id', getBanner1);
router.post('/', isAuth, isAdmin, upload.array('image', 1), createBanner);
router.put('/:id', isAuth, isAdmin, upload.array('image', 1), updateBanner1);
router.delete('/:id', isAuth, isAdmin, deleteBanner1);

export default router;
