export type CalendarProps = {
  selectedDate: string | null;
  onSelect: (date: Date) => void;
  counts: Record<string, number>;
};
