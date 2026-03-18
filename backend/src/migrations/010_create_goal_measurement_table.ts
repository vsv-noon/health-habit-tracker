import { MigrationBuilder } from 'node-pg-migrate';

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createTable('goal_measurement', {
    id: {
      type: 'serial',
      primaryKey: true,
    },
    goal_id: {
      type: 'integer',
      notNull: true,
      references: 'goals(id)',
      onDelete: 'CASCADE',
    },
    user_id: {
      type: 'integer',
      notNull: true,
      references: 'users(id)',
      onDelete: 'CASCADE',
    },
    measured_value: {
      type: 'double precision',
      default: 1,
    },
    note: {
      type: 'text',
    },
    measured_at: {
      type: 'timestamptz',
      default: pgm.func('now()'),
    },
    metadata: {
      type: 'JSONB',
    },
  });
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropTable('goal_progress');
}
