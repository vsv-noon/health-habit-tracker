import { Router } from 'express';

import { authMiddleware } from '../middleware/auth.middleware.js';
import { activateMiddleware } from '../middleware/activate.middleware.js';
import * as analytics from '../controllers/analytics.controller.js';

const router = Router();
router.use(authMiddleware);
router.use(activateMiddleware);

router.get('/', analytics.getAnalyticsController);

export default router;
