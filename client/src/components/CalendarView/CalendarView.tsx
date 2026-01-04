import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import type { CalendarViewProps } from "./types";
import "./style.css";

export function CalendarView({
  onSelect,
  selectedDate,
  dateWithTodos,
  todosCountByDate,
}: CalendarViewProps) {
  return (
    <Calendar
      onClickDay={onSelect}
      tileClassName={({ date, view }) => {
        if (view !== "month") return null;

        const d = date.toLocaleDateString("en-CA"); // YYYY-MM-DD

        return [
          dateWithTodos.has(d) && "has-todos",
          selectedDate === d && "selected-date",
        ]
          .filter(Boolean)
          .join(" ");
      }}
      tileContent={({ date, view }) => {
        if (view !== "month") return null;

        const d = date.toLocaleDateString("en-CA");
        const count = todosCountByDate.get(d);

        if (!count) return null;

        return <span className="todo-badge">{count}</span>;
      }}
    />
  );
}
