import { PoolClient } from 'pg';

import { pool } from '../config/db.js';
import { Session } from '../types/measurements.types.js';

export async function getMeasurementSessions(userId: number) {
  const result = await pool.query(
    `
    SELECT * FROM measurement_sessions
    WHERE user_id = $1
    ORDER BY created_at DESC
    `,
    [userId]
  );

  return result.rows;
}

export async function createSession(
  client: PoolClient,
  { userId, sessionDate, category }: { userId: number; sessionDate: Date; category?: string }
): Promise<Session> {
  const res = await client.query(
    `
    INSERT INTO measurement_sessions (user_id, session_date, category)
    VALUES ($1, $2, $3)
    ON CONFLICT (user_id, session_date, category)
    DO UPDATE SET session_date = EXCLUDED.session_date
    RETURNING id
    `,
    [userId, sessionDate, category]
  );

  return res.rows[0];
}
