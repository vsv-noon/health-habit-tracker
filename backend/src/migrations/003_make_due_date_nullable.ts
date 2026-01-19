import { MigrationBuilder } from 'node-pg-migrate';

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.alterColumn('todos', 'due_date', {
    notNull: false,
  });
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.alterColumn('todos', 'due_date', {
    notNull: true,
  });
}
