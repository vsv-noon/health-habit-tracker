import { MigrationBuilder } from 'node-pg-migrate';

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.noTransaction();

  pgm.sql(`
    CREATE UNIQUE INDEX CONCURRENTLY idx_goal_measurements_unique_day
    ON goal_measurements (goal_id, CAST(measured_at AS DATE));
    `);

  // pgm.createIndex('goal_measurements', [{ name: 'goal_id' }, { name: 'measured_at' }], {
  //   unique: true,
  //   concurrently: true,
  //   name: 'idx_goal_measurements_unique_day',
  // });
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.noTransaction();

  pgm.sql(`
    DROP INDEX CONCURRENTLY IF EXISTS idx_goal_measurements_unique_day;
    `);

  // pgm.dropIndex('goal_measurements', ['goal_id', 'measured_at'], {
  //   concurrently: true,
  //   name: 'idx_goal_measurements_unique_day',
  // });
}
