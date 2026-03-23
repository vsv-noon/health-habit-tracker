import { useState } from 'react';

interface MeasurementInputProps {
  goalId: number;
  onMeasurement: () => void;
}

export function MeasurementInput({ goalId, onMeasurement }: MeasurementInputProps) {
  const [value, setValue] = useState('');
  const accessToken = localStorage.getItem('accessToken');

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
      }),
    });
    onMeasurement();
    setValue('');
    // onMeasurementAdded(); // refresh goal
  };

  return (
    <div>
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
