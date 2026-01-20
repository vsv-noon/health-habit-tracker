import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import type { CalendarProps } from './types';
import './style.css';
import { formattedDate } from '../../utils/date';
import { LAST_INDEX } from './constants';

export function CalendarView({
  onSelect,

  // selectedDate,
  counts,
}: CalendarProps) {
  return (
    <Calendar
      // value={new Date(selectedDate)}
      onClickDay={onSelect}
      tileContent={({ date, view }) => {
        if (view !== 'month') return null;

        const key = formattedDate(date, LAST_INDEX);
        const count = counts[key];

        if (!count) return null;

        return <span className="todo-badge">{count}</span>;
      }}
    />
  );
}
