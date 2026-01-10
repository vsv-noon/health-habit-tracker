export interface CalendarViewProps {
  onSelect: (date: Date) => void;
  selectedDate: string | null;
  dateWithTodos: Set<string>;
  todosCountByDate: Map<string, number>;
}