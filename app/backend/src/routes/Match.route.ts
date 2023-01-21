import { Router } from 'express';
import authMiddleware from '../middlewares/auth.middleware';
import MatchController from '../controllers/Match.controller';
import matchMiddleware from '../middlewares/match.middleware';

const router = Router();

router.get('/', MatchController.getAll);
router.get('/?', MatchController.getByQuery);
router.patch('/:id/finish', MatchController.endMatch);
router.post('/', authMiddleware, matchMiddleware, MatchController.create);

export default router;
