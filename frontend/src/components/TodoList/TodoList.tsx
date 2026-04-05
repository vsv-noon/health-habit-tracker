import { useState } from 'react';
import { apiDelete, apiFetch } from '../../services/api/api';
import type { TodoListProps } from './types';
import type { Todo } from '../../types/todo';
import { ConfirmationDialog } from '../ConfirmationDialog/ConfirmationDialog';

import './TodoList.css';
import { reorderTodos } from '../../services/api/todos.api';
import { TodoItem } from '../TodoItem/TodoItem';

export function TodoList({ todos, onEdit, onUpdate, onDelete, onReorder }: TodoListProps) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<Todo | null>(null);

  const [dragId, setDragId] = useState<number | null>(null);

  function handleDragStart(id: number) {
    setDragId(id);
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
  }

  async function handleDrop(targetId: number) {
    if (dragId === null || dragId === targetId) return;

    const items = [...todos];
    const fromIndex = items.findIndex((t) => t.id === dragId);
    const toIndex = items.findIndex((t) => t.id === targetId);

    const [moved] = items.splice(fromIndex, 1);
    items.splice(toIndex, 0, moved);

    const updated = items.map((t, i) => ({
      ...t,
      position: i,
    }));

    onReorder(updated);

    await reorderTodos(
      updated.map((t) => ({
        id: t.id,
        position: t.position,
      })),
    );
  }

  async function toggleCompleted(todo: Todo) {
    const updated = await apiFetch<Todo>(`/todos/${todo.id}`, {
      method: 'PATCH',
      body: JSON.stringify({ completed: !todo.completed }),
    });

    onUpdate(updated);
  }

  function handleDeleteClick(todo: Todo) {
    setItemToDelete(todo);
    setModalOpen(true);
  }

  async function handleConfirmDelete(todo: Todo | null) {
    if (todo) {
      console.log(`Deleting item with ID: ${todo.id}`);
      await apiDelete(`/todos/${todo.id}`);
      onDelete(todo.id);
    }
    setItemToDelete(null);
  }

  function handleCloseModal() {
    setModalOpen(false);
    setItemToDelete(null);
  }

  return (
    <>
      <ul>
        {todos &&
          todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onDragStart={() => handleDragStart(todo.id)}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(todo.id)}
              onComplete={() => toggleCompleted(todo)}
              onEdit={() => onEdit(todo)}
              onDelete={() => handleDeleteClick(todo)}
            />
          ))}
      </ul>

      <ConfirmationDialog
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Are you sure?"
        message={`Do you really want to delete task "${itemToDelete?.title}"`}
        onConfirm={() => handleConfirmDelete(itemToDelete)}
      />
    </>
  );
}
