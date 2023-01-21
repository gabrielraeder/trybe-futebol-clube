import { Router } from 'express';
import LeaderboardController from '../controllers/Leaderboard.controller';

const router = Router();

router.get('/home', LeaderboardController.getAllHome);
router.get('/away', LeaderboardController.getAllAway);

export default router;
