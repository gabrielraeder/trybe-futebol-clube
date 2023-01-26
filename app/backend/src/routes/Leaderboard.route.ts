import { Router } from 'express';
import LeaderboardController from '../controllers/Leaderboard.controller';

// const router = Router();

// router.get('/', LeaderboardController.getAll);
// router.get('/home', LeaderboardController.getAllHome);
// router.get('/away', LeaderboardController.getAllAway);

// export default router;

export default class LeaderboardRouter {
  public router: Router;

  constructor() {
    this.router = Router();

    this.router.get('/', LeaderboardController.getAll);
    this.router.get('/home', LeaderboardController.getAllHome);
    this.router.get('/away', LeaderboardController.getAllAway);
  }
}
