import { PoolClient } from 'pg';

import { MeasurementType } from '../types/measurementTypes.types.js';

export async function getAll(client: PoolClient): Promise<MeasurementType[]> {
  const res = await client.query<MeasurementType>(
    `
    SELECT id, name, label, unit, category, created_at
    FROM measurement_types
    `
  );

  return res.rows;
}

export async function create(client: PoolClient, data: Omit<MeasurementType, 'id'>) {
  const res = await client.query<MeasurementType>(
    `
    INSERT INTO measurement_types (name, label, unit, category)
    VALUES ($1, $2, $3, $4)
    RETURNING *
    `,
    [data.name, data.label, data.unit, data.category || null]
  );

  return res.rows[0];
}

export async function update(
  client: PoolClient,
  id: number,
  data: Partial<MeasurementType>
): Promise<MeasurementType | null> {
  const fields: string[] = [];
  const values: unknown[] = [];

  let i = 1;

  for (const key of ['name', 'label', 'unit', 'category'] as const) {
    if (data[key] !== undefined) {
      fields.push(`${key} = $${i++}`);
      values.push(data[key]);
    }
  }

  if (fields.length === 0) return null;

  values.push(id);

  const res = await client.query<MeasurementType>(
    `
    UPDATE measurement_types
    SET ${fields.join(', ')}
    WHERE id = $${i}
    RETURNING *
    `,
    values
  );

  return res.rows[0] || null;
}

export async function remove(client: PoolClient, id: number): Promise<boolean> {
  const res = await client.query(
    `
    DELETE FROM measurement_types WHERE id = $1
    `,
    [id]
  );

  return res.rowCount! > 0;
}

export async function upsertMeasurementTypes(client: PoolClient, typeNames: string[]) {
  if (typeNames.length === 0) return;

  const values = typeNames.map((_, i) => `($${i + 1}, 'cm')`).join(',');

  await client.query(
    `
    INSERT INTO measurement_types (name, unit)
    VALUES ${values}
    ON CONFLICT (name) DO NOTHING
    `,
    typeNames
  );
}

export async function getMeasurementTypesMap(client: PoolClient, typeNames: string[]) {
  const res = await client.query(
    `
    SELECT id, name
    FROM measurement_types
    WHERE name = ANY($1)
    `,
    [typeNames]
  );

  const map: Record<string, number> = {};
  for (const row of res.rows) {
    map[row.name] = row.id;
  }

  return map;
}
