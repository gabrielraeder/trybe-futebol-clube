import { Router } from 'express';
import MatchController from '../controllers/Match.controller';

const router = Router();

router.get('/', MatchController.getAll);

export default router;
