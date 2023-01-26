import { Router } from 'express';
import TeamController from '../controllers/Team.controller';

// const router = Router();

// router.get('/', TeamController.getAll);
// router.get('/:id', TeamController.getById);

// export default router;

export default class TeamRouter {
  public router: Router;

  constructor() {
    this.router = Router();

    this.router.get('/', TeamController.getAll);
    this.router.get('/:id', TeamController.getById);
  }
}
