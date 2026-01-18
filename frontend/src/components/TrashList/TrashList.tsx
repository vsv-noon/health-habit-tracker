import { useEffect, useState } from 'react';
import type { Todo } from '../../types/todo';
import { fetchDeletedTodos, hardDeleteTodo, restoreTodo } from '../../api/api';
import './TrashList.css';
import { ConfirmationDialog } from '../ConfirmationDialog/ConfirmationDialog';

export function TrashList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<Todo | null>(null);

  async function handleRestore(id: number) {
    await restoreTodo(id);
    setTodos((t) => t.filter((x) => x.id !== id));
  }

  function handleDeleteClick(todo: Todo) {
    setItemToDelete(todo);
    setModalOpen(true);
  }

  function handleCloseModal() {
    setItemToDelete(null);
    setModalOpen(false);
  }

  async function handleHardDelete(todo: Todo | null) {
    // if (!confirm('Delete permanently? This cannot be undone.')) return;

    if (todo) {
      await hardDeleteTodo(todo.id);
      setTodos((t) => t.filter((x) => x.id !== todo.id));
    }
  }

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await fetchDeletedTodos(query);
      setTodos(data);
      setLoading(false);
    }

    load();
  }, [query]);

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

      {todos.length === 0 && <p>No deleted tasks</p>}

      {loading && <p>Loading...</p>}

      {!loading && (
        <ul>
          {todos.map((t) => (
            <li key={t.id} className="trashItem">
              <span className="title">{t.title}</span>
              <div className="actions">
                <button onClick={() => handleRestore(t.id)}>♻ Restore</button>
                <button onClick={() => handleDeleteClick(t)}>❌ Delete forever</button>
              </div>
              <span>{t.due_date}</span>
            </li>
          ))}
        </ul>
      )}
      <ConfirmationDialog
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Are you sure?"
        message={`Do you really want to delete task "${itemToDelete?.title}"`}
        onConfirm={() => handleHardDelete(itemToDelete)}
      />
    </div>
  );
}
