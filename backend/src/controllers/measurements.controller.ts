import type { Request, Response } from 'express';

import * as measurementsService from '../services/measurements.service.js';
import { MeasurementInput } from '../types/measurements.types.js';

export async function createMeasurement(req: Request, res: Response) {
  if (!req.user) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const measurements = await measurementsService.createNewMeasurement(req.user.userId, req.body);

    res.status(201).json(measurements);
  } catch (err) {
    console.error('Failed add a Measurement', err);
    return res.status(500).json({ error: 'Failed add a Measurement' });
  }
}

export async function saveFullBodyMeasurementsController(req: Request, res: Response) {
  if (!req.user) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const userId = req.user?.userId;
    const { measuredAt, measurements, comment } = req.body as {
      measuredAt: Date;
      measurements: MeasurementInput[];
      comment: string;
    };

    const measured = await measurementsService.saveFullBodyMeasurements(
      userId,
      measuredAt,
      measurements,
      comment
    );

    if (!measurements || !Array.isArray(measurements) || measurements.length === 0) {
      return res.status(400).json({ error: 'Measurements are required' });
    }

    res.status(201).json(measured);
  } catch (err) {
    res.status(500).json({ error: err || 'Failed to save measurements' });
  }
}
