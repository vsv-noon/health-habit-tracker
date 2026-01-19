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
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const load = useCallback(
    async function load() {
      try {
        setLoading(true);
        const data = await fetchDeletedTodos(query);
        setTodos(data);
        setSelectedItems([]);
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

  function handleSelectItem(id: number, event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.checked) {
      setSelectedItems((prev) => [...prev, id]);
    } else {
      setSelectedItems((prev) => prev.filter((itemId) => itemId !== id));
    }
  }

  async function restoreSelected() {
    await bulkRestore(selectedItems);
    load();
  }

  async function deleteSelected(selectedTodo: number[]) {
    await bulkHardDelete(selectedTodo);
    load();
  }

  function handleSelectAll(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.checked) {
      const allIds = todos.map((item) => item.id);
      setSelectedItems(allIds);
    } else {
      setSelectedItems([]);
    }
  }

  const isAllSelected = selectedItems.length === todos.length && todos.length > 0;

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
      <p>Messages that have been in Trash more than 30 days will be automatically deleted.</p>
      <input type="checkbox" checked={isAllSelected} onChange={handleSelectAll} />
      {/* BULK ACTIONS */}
      {selectedItems.length > 0 && (
        <div>
          <button onClick={restoreSelected}>♻ Restore ({selectedItems.length})</button>
          <button onClick={() => setModalOpen(true)}>
            ❌ Delete forever ({selectedItems.length})
          </button>
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
                checked={selectedItems.includes(t.id)}
                onChange={(e) => handleSelectItem(t.id, e)}
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
        onConfirm={() => deleteSelected(selectedItems)}
      />
    </div>
  );
}
