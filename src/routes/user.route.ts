import express, { Router } from 'express';
import { UserController } from '../controllers/user.controller';

const router: Router = express.Router();
const userController = new UserController();
router.post('/users', userController.createUser);
router.get('/users/:id', userController.getUser);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);


export default router;