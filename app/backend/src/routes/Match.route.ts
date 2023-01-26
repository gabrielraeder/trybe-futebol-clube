import { Router } from 'express';
import authMiddleware from '../middlewares/auth.middleware';
import MatchController from '../controllers/Match.controller';
import matchMiddleware from '../middlewares/match.middleware';

// const router = Router();

// router.get('/', MatchController.getAll);
// router.get('/?', MatchController.getByQuery);
// router.patch('/:id/finish', MatchController.endMatch);
// router.post('/', authMiddleware, matchMiddleware, MatchController.create);
// router.patch('/:id', authMiddleware, MatchController.updateScore);

// export default router;

export default class MatchRouter {
  public router: Router;

  constructor() {
    this.router = Router();

    this.router.get('/', MatchController.getAll);
    this.router.get('/?', MatchController.getByQuery);
    this.router.patch('/:id/finish', MatchController.endMatch);
    this.router.post('/', authMiddleware, matchMiddleware, MatchController.create);
    this.router.patch('/:id', authMiddleware, MatchController.updateScore);
  }
}
