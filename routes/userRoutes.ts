import express from 'express';
const router = express.Router();
import upload from '../fileUpload';
import { isAuth, isAdmin } from '../util';
import { users, login, register, deleteUser, editUser, getUserById, editPassword } from '../controllers/user';

router.get('/', isAuth, isAdmin, users);
router.get('/:id', isAuth, getUserById);
router.post('/login', login);
router.post('/register', register);
router.put('/:id', isAuth, upload.fields([{ name: 'avatar', maxCount: 1 } ]), editUser);
router.put('/edit/password/:id', isAuth, editPassword);
router.delete('/:id', isAuth, isAdmin, deleteUser);

export default router;