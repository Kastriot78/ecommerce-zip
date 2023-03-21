import express from 'express';
const router = express.Router();

import { isAdmin, isAuth } from '../util';
import { getContacts, createContact, deleteContact } from '../controllers/contact';

router.get('/', isAuth, isAdmin, getContacts);
router.post('/', createContact);
router.delete('/:id', isAuth, isAdmin, deleteContact);

export default router;