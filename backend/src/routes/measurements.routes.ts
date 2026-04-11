import { Router } from 'express';

import { authMiddleware } from '../middleware/auth.middleware.js';
import { activateMiddleware } from '../middleware/activate.middleware.js';
import * as measurements from '../controllers/measurements.controller.js';

const router = Router();
router.use(authMiddleware);
router.use(activateMiddleware);

router.post('/body', measurements.saveFullBodyMeasurementsController);
router.post('/', measurements.createMeasurement);

export default router;
