import express, { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { verifyToken } from '../middlewares/verifyToken';

const router: Router = express.Router();
const userController = new UserController();

router.post('/users/register', userController.createUser);
router.post('/users/login', userController.login);
router.get('/users/:id', verifyToken, userController.getUser);
router.put('/users/:id', verifyToken, userController.updateUser);
router.delete('/users/:id', verifyToken, userController.deleteUser);

export default router;
