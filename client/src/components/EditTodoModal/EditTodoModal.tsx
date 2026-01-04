import { useState } from "react";
import type { EditTodoModalProps } from "./types";
import { apiFetch } from "../../api";
import type { Todo } from "../../types/todo";
import { styles } from "./style";

export function EditTodoModal({ todo, onClose, onSave }: EditTodoModalProps) {
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description ?? "");
  const [completed, setCompleted] = useState(todo.completed);
  const [loading, setLoading] = useState(false);

  async function handleSave() {
    setLoading(true);

    const updated = await apiFetch<Todo>(`/todos/${todo.id}`, {
      method: "PUT",
      body: JSON.stringify({
        title,
        description,
        completed,
      }),
    });

    onSave(updated);
    onClose();
    setLoading(false);
  }

  return (
    <>
      {loading && <div>Loading...</div>}
      <div style={styles.overlay} onClick={onClose}>
        <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
          <h3>Edit a task</h3>
          <label>
            {"Title"}
            <input value={title} onChange={(e) => setTitle(e.target.value)} />
          </label>
          <label>
            {"Description"}
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <label style={{ display: "flex", gap: 8 }}>
            <input
              type="checkbox"
              checked={completed}
              onChange={(e) => setCompleted(e.target.checked)}
            />
            {"Completed"}
          </label>

          <div style={styles.actions}>
            <button onClick={onClose}>{"Cancel"}</button>
            <button onClick={handleSave}>{"Save"}</button>
          </div>
        </div>
      </div>
    </>
  );
}
