import { Router } from 'express';

import { authMiddleware } from '../middleware/auth.middleware.js';
import { activateMiddleware } from '../middleware/activate.middleware.js';
import * as measurementSessionsController from '../controllers/measurementSessions.controller.js';

const router = Router();
router.use(authMiddleware);
router.use(activateMiddleware);

router.get('/', measurementSessionsController.getMeasurementSessionsController);

export default router;
