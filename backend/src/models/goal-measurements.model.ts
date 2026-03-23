import { pool } from '../config/db.js';

export type GoalMeasurementsRow = {
  goal_id: number;
  measured_value: number;
  note: string;
};

export async function createMeasurement(userId: number, data: GoalMeasurementsRow) {
  const { goal_id, measured_value, note } = data;

  const result = await pool.query(
    `
    INSERT INTO goal_measurements (goal_id, user_id, measured_value, note)
    VALUES ($1, $2, $3, $4)
    RETURNING *
    `,
    [goal_id, userId, measured_value, note]
  );

  return result.rows[0];
}
