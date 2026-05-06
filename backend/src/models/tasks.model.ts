import { PoolClient } from 'pg';

import { pool } from '../config/db.js';

export async function createTask(
  client: PoolClient,
  userId: number,
  data: {
    title: string;
    description?: string;
    // dueDate: Date;
    // remindAt?: string;
    // priority?: number;
    goalId?: number;
    isRecurring: boolean;
  }
) {
  const result = await client.query(
    `
      INSERT INTO tasks (user_id, title, description, goal_id, is_recurring)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
      `,
    [
      userId,
      data.title,
      data.description,
      // data.dueDate,
      // data.remindAt,
      // data.priority,
      data.goalId,
      data.isRecurring,
    ]
  );

  return result.rows[0];
}

export async function createTaskRecurrence(
  client: PoolClient,
  taskId: number,
  data: {
    type: string;
    interval: number;
    daysOfWeek: number[];
    dayOfMonth: number;
    startDate: Date;
    endDate: Date;
  }
) {
  const result = await client.query(
    `
    INSERT INTO task_recurrence (
      task_id,
      type,
      interval,
      days_of_week,
      day_of_month,
      start_date,
      end_date
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    `,
    [
      taskId,
      data.type,
      data.interval,
      data.daysOfWeek,
      data.dayOfMonth,
      data.startDate,
      data.endDate,
    ]
  );

  return result.rows[0];
}

export async function createTaskInstance(
  client: PoolClient,
  userId: number,
  taskId: number,
  dueDate: Date
) {
  await client.query(
    `
    INSERT INTO task_instances (user_id, task_id, due_date)
    VALUES ($1, $2, $3)
    `,
    [userId, taskId, dueDate]
  );
}

// export async function createInstances(
//   client: PoolClient,
//   userId: number,
//   taskId: number,
//   dates: Date[]
// ) {
//   for (const d of dates) {
//     const date = d.toISOString().slice(0, 10);

//     await client.query(
//       `
//       INSERT INTO task_instances (user_id, task_id, due_date)
//       SELECT $1, $2, $3
//       WHERE NOT EXISTS (
//         SELECT 1 FROM task_exceptions te
//         WHERE te.task_id = $2
//           AND te.date = $3
//           AND te.type = 'deleted'
//       )
//       ON CONFLICT (task_id, due_date) DO NOTHING
//       `,
//       [userId, taskId, date]
//     );
//   }
// }

export async function createInstances(
  client: PoolClient,
  userId: number,
  taskId: number,
  dates: Date[]
) {
  const values = dates.map((_, i) => `($1::int, $2::int, $${i + 3}::date)`).join(',');

  const params = [userId, taskId, ...dates.map((d) => d.toISOString().slice(0, 10))];
  await client.query(
    `
      INSERT INTO task_instances (user_id, task_id, due_date)
      SELECT v.user_id, v.task_id, v.due_date
      FROM (VALUES ${values}) AS v(user_id, task_id, due_date)
      WHERE NOT EXISTS (
        SELECT 1 FROM task_exceptions te
        WHERE te.task_id = v.task_id
          AND te.date = v.due_date
          AND te.type = 'deleted'
      )
      ON CONFLICT (task_id, due_date) DO NOTHING
      `,
    params
  );
}

export async function getRecurringTasks(client: PoolClient, userId: number) {
  const result = await client.query(
    `
          SELECT t.id, tr.*
          FROM tasks t
          JOIN task_recurrence tr ON tr.task_id = t.id
          WHERE t.user_id = $1
          `,
    [userId]
  );

  return result;
}

export async function getRangeInstances(
  client: PoolClient,
  userId: number,
  start: string,
  end: string
) {
  const result = await client.query(
    `
          SELECT ti.*, t.title
          FROM task_instances ti
          JOIN tasks t ON t.id = ti.task_id
          WHERE t.user_id = $1
            AND ti.due_date BETWEEN $2 AND $3
          ORDER BY ti.due_date
          `,
    [userId, start, end]
  );

  return result.rows;
}

export async function updateTask(client: PoolClient, status: string, id: number, userId: number) {
  const result = await client.query(
    `
    UPDATE task_instances ti
    SET status = $1
    FROM tasks t
    WHERE ti.id = $2
      AND ti.task_id = t.id
      AND t.user_id = $3
    RETURNING ti.*;
    `,
    [status, id, userId]
  );

  return result.rows[0];
}

export async function deleteTask(userId: number, taskId: number, mode: string, date: Date) {
  if (mode === 'this') {
    const result = await pool.query(
      `
      INSERT INTO task_exceptions (task_id, date, type)
      VALUES ($1, $2, 'deleted')
      ON CONFLICT DO NOTHING
      `,
      [taskId, date]
    );

    await pool.query(
      `
      DELETE FROM task_instances
      WHERE user_id = $1
        AND task_id = $2
        AND due_date = $3
      `,
      [userId, taskId, date]
    );

    return result.rowCount! > 0;
  }

  if (mode === 'future') {
    await pool.query(
      `
      UPDATE tasks
      SET recurrence_end = $1
      WHERE id = $2
      `,
      [date, taskId]
    );

    const result = await pool.query(
      `
      DELETE FROM task_instances
      WHERE user_id = $1
        AND task_id = $2
        AND due_date >= $3
        AND is_exception = false
      RETURNING 1
      `,
      [userId, taskId, date]
    );

    return result.rowCount! > 0;
  }
  if (mode === 'all') {
    const result = await pool.query(
      `
      DELETE FROM tasks
      WHERE user_id = $1
        AND id = $2
      `,
      [userId, taskId]
    );

    return result.rowCount! > 0;
  }
}
