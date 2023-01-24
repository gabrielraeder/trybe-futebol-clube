import { Router } from 'express';
import UserController from '../controllers/User.controller';
import userMiddleware from '../middlewares/user.middleware';
import authMiddleware from '../middlewares/auth.middleware';

const router = Router();

router.post('/', userMiddleware, UserController.login);
router.get('/validate', authMiddleware, UserController.validate);

export default router;
