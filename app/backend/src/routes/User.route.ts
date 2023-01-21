import { Router } from 'express';
import UserController from '../controllers/User.controller';
import userMiddleware from '../middlewares/user.middleware';

const router = Router();

router.post('/', userMiddleware, UserController.login);
router.get('/validate', UserController.validate);

export default router;
