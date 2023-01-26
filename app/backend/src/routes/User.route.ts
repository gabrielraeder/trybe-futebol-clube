import { Router } from 'express';
import UserController from '../controllers/User.controller';
import userMiddleware from '../middlewares/user.middleware';
import authMiddleware from '../middlewares/auth.middleware';

// const router = Router();

// router.post('/', userMiddleware, UserController.login);
// router.get('/validate', authMiddleware, UserController.validate);

// export default router;

export default class UserRouter {
  public router: Router;

  constructor() {
    this.router = Router();

    this.router.post('/', userMiddleware, UserController.login);
    this.router.get('/validate', authMiddleware, UserController.validate);
  }
}
