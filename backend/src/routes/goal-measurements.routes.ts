import { Router } from 'express';

import { authMiddleware } from '../middleware/auth.middleware.js';

import * as goalMeasurement from './../controllers/goal-measurements.controller.js';

const router = Router();
router.use(authMiddleware);

router.post('/', goalMeasurement.createMeasurement);

export default router;
