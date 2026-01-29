// import type { Priority } from '../../types/todo';

export type TodoFormField = keyof TodoFormData;

export type TodoFormData = {
  title: string;
  description: string;
  due_date: string;
  remind_at: string;
  priority: string;
  completed?: boolean; // only for edit
};

export type TodoFormProps = {
  todoFormTitle: string;
  form: TodoFormData;
  update: <K extends TodoFormField>(key: K, value: TodoFormData[K]) => void;
  error?: string | null;
  submitLabel: string;
  onSubmit: () => void;
  onClose: () => void;
  showCompleted?: boolean;
  // existingTitles: string[];
};
