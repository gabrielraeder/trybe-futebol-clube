import { Router } from 'express';
import UserController from '../controllers/User.controller';
import userMiddleware from '../middlewares/user.middleware';

const router = Router();

// const userService = new UserService();
// const userController = new UserController(userService);

router.post('/', userMiddleware, UserController.login);
router.get('/validate', UserController.validate);
// router.get('/', test);

export default router;
