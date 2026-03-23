import { useState } from 'react';

interface MeasurementInputProps {
  goalId: number;
  onMeasurement: () => void;
}

export function MeasurementInput({ goalId, onMeasurement }: MeasurementInputProps) {
  const [value, setValue] = useState('');
  const [date, setDate] = useState(new Date().toLocaleDateString('en-CA'));
  const accessToken = localStorage.getItem('accessToken');
  console.log(date);

  const addMeasurement = async () => {
    await fetch('http://localhost:5000/api/goal-measurements', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      },
      body: JSON.stringify({
        goal_id: goalId,
        measured_value: Number(value),
        measured_at: date,
      }),
    });
    onMeasurement();
    setValue('');
    // onMeasurementAdded(); // refresh goal
  };

  return (
    <div>
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      <input
        type="number"
        step="0.1"
        placeholder="Enter measurement"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={addMeasurement}>Measure</button>
    </div>
  );
}
