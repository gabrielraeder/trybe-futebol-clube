import { Router } from 'express';
import TeamController from '../controllers/Team.controller';

const router = Router();

router.get('/', TeamController.getAll);
router.get('/:id', TeamController.getById);

export default router;
