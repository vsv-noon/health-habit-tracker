export type MeasurementsRow = {
  goal_id: number;
  measured_value: number;
  note: string;
  measured_at: Date;
};

export interface MeasurementInput {
  type: string;
  measured_value: number;
}

export interface SaveFullBodyMeasurementsDTO {
  userId: string;
  measuredAt?: string | Date;
  measurements: MeasurementInput[];
}

export interface MeasurementRow {
  userId: number;
  typeId: number;
  sessionId: number;
  measuredValue: number;
  measuredAt: Date;
}

export interface Session {
  id: number;
}

export interface SaveMeasurementsResult {
  message: string;
  sessionId: number;
}
