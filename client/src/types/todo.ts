export interface Todo {
  id: number;
  title: string;
  description: string | null;
  due_date: string;       // YYYY-MM-DD
  completed: boolean;
  created_at: string;    // ISO (UTC)
  updated_at: string;    // ISO (UTC)
}





