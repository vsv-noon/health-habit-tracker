import type { Request, Response } from 'express';

import * as measurementSessionsService from '../services/measurementSessions.service.js';

export async function getMeasurementSessionsController(req: Request, res: Response) {
  if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
  console.log(req.body);
  try {
    const sessions = await measurementSessionsService.getMeasurementSessionsList(req.user.userId);

    return res.json(sessions);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to fetch Measurement Sessions' });
  }
}
