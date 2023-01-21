import { Router } from 'express';
import MatchController from '../controllers/Match.controller';

const router = Router();

router.get('/', MatchController.getAll);
router.get('/?', MatchController.getByQuery);
router.patch('/:id/finish', MatchController.endMatch);

export default router;
