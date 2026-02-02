import type { TodoItemProps } from './types';

export function TodoItem({
  todo,
  onComplete,
  onDragStart,
  onDragOver,
  onDrop,
  onEdit,
  onDelete,
}: TodoItemProps) {
  return (
    <li
      className="todoItem"
      draggable
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <input
        type="checkbox"
        title="select to complete"
        checked={todo.completed}
        onChange={onComplete}
        onPointerDown={(e) => e.stopPropagation()}
      />

      <span
        className="title"
        style={{
          textDecoration: todo.completed ? 'line-through' : 'none',
        }}
      >
        {todo.title}
      </span>
      <span>{todo.description}</span>

      <div className="actions" onPointerDown={(e) => e.stopPropagation()}>
        <button onClick={onEdit}>✏️</button>

        <button onClick={onDelete}>🗑</button>
      </div>
      <span>{todo.due_date}</span>
    </li>
  );
}
