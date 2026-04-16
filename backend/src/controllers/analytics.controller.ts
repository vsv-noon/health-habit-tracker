import { Request, Response } from 'express';

import * as analyticsService from '../services/analytics.service.js';

export async function getAnalyticsController(
  req: Request<unknown, unknown, unknown, { type: string; from: string; to: string }>,
  res: Response
) {
  if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
  try {
    const userId = req.user?.userId;

    // const type = req.query.type;
    // const from = req.query.from;
    // const to = req.query.to;

    const { type, from, to } = req.query;

    if (!userId) return;

    if (!type) {
      return res.status(400).json({ error: 'type required' });
    }

    const data = await analyticsService.getAnalytics(userId, type, from, to);

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
}
