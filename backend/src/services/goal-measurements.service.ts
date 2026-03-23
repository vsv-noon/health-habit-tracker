import * as model from '../models/goal-measurements.model.js';

export async function createNewMeasurement(
  userId: number,
  data: { goal_id: number; measured_value: number; note: string }
) {
  return model.createMeasurement(userId, data);
}
