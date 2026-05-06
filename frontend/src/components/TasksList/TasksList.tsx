import { apiDeleteTask, apiFetch } from '../../services/api/api';
import type { Task } from '../../pages/TasksPage/TasksPage';
import TaskItem from '../TaskItem/TaskItem';
import { ConfirmationDialog } from '../ConfirmationDialog/ConfirmationDialog';
import { useState } from 'react';

function TasksList({
  tasks,
  setTasks,
}: {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  console.log(tasks);

  async function handleUpdate(item: Task, { status }: { status: string }) {
    setTasks((prev) => prev.map((t) => (t.id === item.id ? { ...t, status } : t)));

    try {
      await apiFetch(`/tasks/${item.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ status: status }),
      });

      setTasks((prev) => prev.map((t) => (t.id === item.id ? { ...t, status: item.status } : t)));
    } catch (err) {
      console.error(err);
    }
  }

  function handleDeleteClick(task) {
    setTaskToDelete(task);
    setModalOpen(true);
  }

  const mode = 'this';

  async function handleConfirmDelete(task, mode: string) {
    if (task) {
      const payload = { mode };
      if (mode !== 'all') {
        payload.date = task.due_date;
      }

      await apiDeleteTask(`/tasks/${task.task_id}`, payload);

      setTasks((prev) => prev.filter((t) => t.id !== task.id));
    }
  }

  function handleCloseModal() {
    setModalOpen(false);
    setTaskToDelete(null);
  }

  return (
    <div>
      <h2>TasksList</h2>

      <ul>
        {tasks &&
          tasks.map((el) => (
            <TaskItem
              key={el.id}
              task={el}
              onUpdate={handleUpdate}
              onDelete={() => handleDeleteClick(el)}
            />
          ))}
      </ul>

      <ConfirmationDialog
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Are your sure?"
        message={`Do you really want to delete task "${taskToDelete?.title}"`}
        onConfirm={() => handleConfirmDelete(taskToDelete, mode)}
      />
    </div>
  );
}

export default TasksList;
