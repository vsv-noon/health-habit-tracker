import { pool } from "../db.js";

export async function restoreTodo(req, res) {
  try {
    const { id } = req.params;

    const { rows, rowCount } = await pool.query(
      `
      UPDATE todos
      SET deleted_at = NULL
      WHERE id = $1
      AND deleted_at IS NOT NULL
      RETURNING *
      `,
      [id]
    );

    if (rowCount === 0) {
      return res.setStatus(404);
    }

    if (Number.isNaN(id)) {
      return res.sendStatus(400);
    }

    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Server Error" });
  }
}
