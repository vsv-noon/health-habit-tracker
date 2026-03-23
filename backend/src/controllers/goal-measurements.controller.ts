import type { Request, Response } from 'express';

import * as goalMeasurementsService from '../services/goal-measurements.service.js';

export async function createMeasurement(req: Request, res: Response) {
  if (!req.user) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const goalMeasurements = await goalMeasurementsService.createNewMeasurement(
      req.user.userId,
      req.body
    );

    res.status(201).json(goalMeasurements);
  } catch (err) {
    console.error('Failed add a Measurement', err);
    return res.status(500).json({ error: 'Failed add a Measurement' });
  }
}
