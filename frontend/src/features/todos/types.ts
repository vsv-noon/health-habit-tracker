import type { Priority } from '../../types/todo';

export type TodoFormData = {
  title: string;
  description: string;
  due_date: string;
  remind_at: string | null;
  priority: Priority;
  completed?: boolean; // only for edit
};

export type TodoFormProps = {
  todoFormTitle: string;
  form: TodoFormData;
  update: <K extends keyof TodoFormData>(key: K, value: TodoFormData[K]) => void;
  error?: string | null;
  submitLabel: string;
  onSubmit: () => void;
  onClose: () => void;
  showCompleted?: boolean;
  // existingTitles: string[];
};
