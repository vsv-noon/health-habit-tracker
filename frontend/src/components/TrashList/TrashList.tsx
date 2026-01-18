import { useCallback, useEffect, useState } from 'react';
import type { Todo } from '../../types/todo';
import { bulkHardDelete, bulkRestore, fetchDeletedTodos } from '../../api/api';
import './TrashList.css';
import { ConfirmationDialog } from '../ConfirmationDialog/ConfirmationDialog';

export function TrashList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState<number[]>([]);

  const load = useCallback(
    async function load() {
      try {
        setLoading(true);
        const data = await fetchDeletedTodos(query);
        setTodos(data);
        setSelected([]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    [query],
  );

  useEffect(() => {
    load();
  }, [load]);

  function toggle(id: number) {
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  }

  async function restoreSelected() {
    await bulkRestore(selected);
    load();
  }

  async function deleteSelected(selectedTodo: number[]) {
    // if (!confirm('Delete permanently selected tasks?')) return;

    await bulkHardDelete(selectedTodo);
    load();
  }

  return (
    <div>
      <h2>🗑 Trash</h2>

      {/* 🔍 SEARCH */}
      <input
        placeholder="Search deleted tasks..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
      />

      {/* BULK ACTIONS */}
      {selected.length > 0 && (
        <div>
          <button onClick={restoreSelected}>♻ Restore ({selected.length})</button>
          <button onClick={() => setModalOpen(true)}>❌ Delete forever ({selected.length})</button>
        </div>
      )}
      {todos.length === 0 && <p>No deleted tasks</p>}

      {loading && <p>Loading...</p>}

      {!loading && (
        <ul>
          {todos.map((t) => (
            <li key={t.id} className="trashItem">
              <input
                type="checkbox"
                title="select"
                checked={selected.includes(t.id)}
                onChange={() => toggle(t.id)}
              />
              <span className="title">{t.title}</span>

              <span>{t.due_date}</span>
            </li>
          ))}
        </ul>
      )}
      <ConfirmationDialog
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        title="Are you sure?"
        message={`Do you really want to delete task selected`}
        onConfirm={() => deleteSelected(selected)}
      />
    </div>
  );
}
