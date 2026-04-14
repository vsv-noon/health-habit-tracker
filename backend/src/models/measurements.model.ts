import { PoolClient } from 'pg';

import { pool } from '../config/db.js';
import { MeasurementRow, MeasurementsRow } from '../types/measurements.types.js';

export async function createGoalMeasurement(userId: number, data: MeasurementsRow) {
  const { type_id, goal_id, measured_value, note, measured_at } = data;

  const result = await pool.query(
    `
    INSERT INTO measurements (type_id, goal_id, user_id, measured_value, note, measured_at)
    VALUES ($1, $2, $3, $4, $5, $6)
    ON CONFLICT (type_id, DATE(measured_at)) DO UPDATE SET
      measured_value = EXCLUDED.measured_value,
      note = EXCLUDED.note,
      measured_at = EXCLUDED.measured_at
    RETURNING *
    `,
    [type_id, goal_id, userId, measured_value, note, measured_at]
  );

  await pool.query(
    `
    UPDATE goals
    SET current_value = $1
    WHERE id = $2 AND goal_type = 'metric'
    `,
    [measured_value, goal_id]
  );

  return result.rows[0];
}

export async function insertMeasurements(
  client: PoolClient,
  rows: MeasurementRow[]
): Promise<void> {
  if (rows.length === 0) return;
  const values: unknown[] = [];
  const placeholders: string[] = [];

  rows.forEach((row, i) => {
    const base = i * 5;

    placeholders.push(`($${base + 1}, $${base + 2}, $${base + 3}, $${base + 4}, $${base + 5})`);
    values.push(row.userId, row.typeId, row.sessionId, row.measuredValue, row.measuredAt);
  });

  await client.query(
    `
    INSERT INTO measurements (user_id, type_id, session_id, measured_value, measured_at)
    VALUES ${placeholders.join(',')}
    ON CONFLICT (session_id, type_id) 
    DO UPDATE
    SET
      measured_value = EXCLUDED.measured_value,
      note = EXCLUDED.note
    RETURNING *
    `,
    values
  );
}
