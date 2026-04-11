import { MigrationBuilder } from 'node-pg-migrate';

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createTable('measurement_types', {
    id: {
      type: 'serial',
      primaryKey: true,
    },
    name: {
      type: 'text',
      notNull: true,
      unique: true,
    },
    unit: {
      type: 'text',
      notNull: true,
    },
    category: {
      type: 'text',
    },
    created_at: {
      type: 'timestamptz',
      default: pgm.func('now()'),
    },
  });
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropTable('measurement_types');
}
