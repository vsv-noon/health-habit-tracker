import { apiDeleteTask, apiFetch } from '../../services/api/api';
import type { Task } from '../../pages/TasksPage/TasksPage';
import TaskItem from '../TaskItem/TaskItem';
import { useState } from 'react';
// import { ConfirmationDialog } from '../ConfirmationDialog/ConfirmationDialog';
import DeleteTasksDialog from '../DeleteTasksDialog/DeleteTasksDialog';

function TasksList({
  tasks,
  setTasks,
}: {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
  const [modeSelect, setModeSelect] = useState<string>('this');

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

  function handleDeleteClick(task: Task) {
    setTaskToDelete(task);
    setModalOpen(true);
  }

  async function handleConfirmDelete(task: Task | null, mode: string) {
    if (!task) {
      return;
    }

    const date: string = '';
    const payload = { mode, date };
    if (mode !== 'all') {
      payload.date = task.due_date;
    }

    await apiDeleteTask(`/tasks/${task.task_id}`, payload);

    if (mode === 'this') {
      setTasks((prev) => prev.filter((t) => t.id !== task.id));
    }

    if (mode === 'following') {
      setTasks((prev) =>
        prev.filter(
          (t) => t.task_id !== task.task_id || new Date(t.due_date) < new Date(task.due_date),
        ),
      );
    }

    if (mode === 'all') {
      setTasks((prev) => prev.filter((t) => t.task_id !== task.task_id));
    }
  }

  function handleCloseModal() {
    setModalOpen(false);
    setTaskToDelete(null);
  }

  return (
    <div>
      <h2>Tasks List</h2>

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

      {/* <ConfirmationDialog
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Are your sure?"
        message={`Do you really want to delete task "${taskToDelete?.title}"`}
        onConfirm={() => handleConfirmDelete(taskToDelete, mode)}
      /> */}
      <DeleteTasksDialog
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        mode={modeSelect}
        setMode={setModeSelect}
        // title="Are your sure?"
        // message={`Do you really want to delete task "${taskToDelete?.title}"`}
        onConfirm={() => handleConfirmDelete(taskToDelete, modeSelect)}
      />
    </div>
  );
}

export default TasksList;
