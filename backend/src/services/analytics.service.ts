import * as analyticsModel from '../models/analytics.model.js';
import { pool } from '../config/db.js';

export async function getAnalytics(userId: number, types: string[], from: string, to: string) {
  const client = await pool.connect();

  try {
    const rows = await analyticsModel.getMeasurementsAnalytics(client, userId, types, from, to);
    const result: Record<string, any[]> = {};

    // const target = await analyticsModel.getGoalTargetValueByTypeName(client, types[0], userId);
    const target = 0;

    for (const row of rows) {
      if (!result[row.name]) {
        result[row.name] = [];
      }

      result[row.name]?.push({
        date: row.date,
        value: Number(row.measured_value),
      });
    }

    return { target, result };
  } finally {
    client.release();
  }
}
