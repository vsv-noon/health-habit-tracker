import { MigrationBuilder } from 'node-pg-migrate';

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createTable('todos', {
    id: {
      type: 'serial',
      primaryKey: true,
    },

    title: {
      type: 'varchar(255)',
      notNull: true,
    },

    completed: {
      type: 'boolean',
      notNull: true,
      default: false,
    },

    due_date: {
      type: 'date',
      notNull: false,
    },

    remind_at: {
      type: 'timestamptz',
      notNull: false,
    },

    created_at: {
      type: 'timestamptz',
      notNull: true,
      default: pgm.func('now()'),
    },

    updated_at: {
      type: 'timestamptz',
      notNull: true,
      default: pgm.func('now()'),
    },
  });

  // index for calendar
  pgm.createIndex('todos', 'due_date');
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropTable('todos');
}
