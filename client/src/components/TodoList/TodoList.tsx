import { useState } from "react";
import type { TodoListProps } from "./types";
import type { Todo } from "../../types/todo";
import { apiDelete, apiFetch } from "../../api";

export function TodoList({ todos, onEdit, onUpdate, onDelete }: TodoListProps) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");

  async function toggleCompleted(todo: Todo) {
    const updated = await apiFetch<Todo>(`/todos/${todo.id}`, {
      method: "PUT",
      body: JSON.stringify({
        title: todo.title,
        description: todo.description,
        completed: !todo.completed,
      }),
    });

    onUpdate(updated);
  }

  async function saveEdit(todo: Todo) {
    const updated = await apiFetch<Todo>(`/todos/${todo.id}`, {
      method: "PUT",
      body: JSON.stringify({
        title: editTitle,
        description: todo.description,
        completed: todo.completed,
      }),
    });

    onUpdate(updated);
    setEditingId(null);
  }

  async function deleteTodo(todo: Todo) {
    if (!window.confirm(`Delete task "${todo.title}"?`)) return;

    await apiDelete(`/todos/${todo.id}`);
    onDelete(todo.id);
  }

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id} style={{ marginBottom: 8 }}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleCompleted(todo)}
          />
          {editingId === todo.id ? (
            <>
              <input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
              <button onClick={() => saveEdit(todo)}>💾</button>
              <button onClick={() => setEditingId(null)}>✖</button>
            </>
          ) : (
            <>
              <span
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                }}
              >
                {todo.title}
              </span>
              <button
                onClick={() => {
                  setEditingId(todo.id);
                  setEditTitle(todo.title);
                }}
              >
                ✏️
              </button>
              <button onClick={() => onEdit(todo)}>✏️</button>
              <button onClick={() => deleteTodo(todo)}>🗑</button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}
