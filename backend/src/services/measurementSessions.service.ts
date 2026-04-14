import * as measurementSessionsModel from '../models/measurementSessions.model.js';

export async function getMeasurementSessionsList(userId: number) {
  return measurementSessionsModel.getMeasurementSessions(userId);
}
