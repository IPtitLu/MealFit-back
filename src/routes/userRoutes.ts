import express from 'express';
import { createUser, getUser, updateUser, deleteUser } from '../controllers/userController';

const router = express.Router();

router.post('/users/create', createUser);
router.get('/users/:id', getUser);
router.put('/users/update/:id', updateUser);
router.delete('/users/delete/:id', deleteUser);

export default router;
