import { Router } from "express";

import {
  createTodo,
  deleteTodo,
  getAllTodos,
  getTodoByDate,
  restoreTodo,
  updateTodo,
} from "../controllers/todos.controller.js";

const router = Router();

// Create
router.post("/", createTodo);

// Restore
router.patch("/:id/restore", restoreTodo);

// Update
router.patch("/:id", updateTodo);

// Reade
router.get("/", getAllTodos);

router.get("date/:date", getTodoByDate);

// Delete
router.delete("/:id", deleteTodo);

export default router;
