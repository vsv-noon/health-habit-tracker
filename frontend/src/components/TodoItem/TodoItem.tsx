import { useEffect, useState } from 'react';
import { fetchGoalById } from '../../api/goals.api';
import { MeasurementInput } from '../MeasurementInput/MeasurementInput';
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
  const [goalType, setGoalType] = useState<'metric' | 'counter'>();
  const currentDate = new Date().toLocaleDateString('en-CA');

  useEffect(() => {
    if (!todo.goal_id) return;
    async function getGoalTypeById(id: number) {
      const data = await fetchGoalById(id);
      setGoalType(data.goal_type);
    }

    getGoalTypeById(todo.goal_id);
  }, [todo.goal_id]);

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
        disabled={
          currentDate !== todo.due_date ||
          (currentDate === todo.due_date && todo.completed === true)
        }
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
      {currentDate === todo.due_date && goalType === 'metric' && todo.completed === false && (
        <MeasurementInput goalId={todo.goal_id} onMeasurement={() => onComplete()} />
      )}

      <div className="actions" onPointerDown={(e) => e.stopPropagation()}>
        <button onClick={onEdit}>✏️</button>

        <button onClick={onDelete}>🗑</button>
      </div>
      <span>{todo.due_date}</span>
    </li>
  );
}
