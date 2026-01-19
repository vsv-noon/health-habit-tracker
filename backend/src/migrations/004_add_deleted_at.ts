import { MigrationBuilder } from 'node-pg-migrate';

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.addColumn('todos', {
    deleted_at: {
      type: 'timestamptz',
      notNull: false,
    },
  });

  pgm.createIndex('todos', 'deleted_at');
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropColumn('todos', 'deleted_at');
}
