import { Router } from 'express';
import UserController from '../controllers/User.controller';
// import UserService from '../services/User.service';
// import User from '../database/models/User.model';
// import loginMiddleware from '../middlewares/login.middleware';

const router = Router();

// const userService = new UserService();
// const userController = new UserController(userService);

// const test = async (req: Request, res: Response) => {
//   const teste = await User.findAll();
//   return res.status(200).json(teste);
// };

router.post('/', UserController.login);
// router.get('/', test);

export default router;
