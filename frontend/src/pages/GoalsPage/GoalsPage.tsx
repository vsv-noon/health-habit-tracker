import { useEffect, useState } from 'react';
import { fetchGoals, type Goal } from '../../api/goals.api';
import { GoalForm } from '../../components/GoalForm/GoalForm';
import { GoalsList } from '../../components/GoalsList/GoalsList';

export default function GoalsPage() {
  const [goals, setGoals] = useState<Goal[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchGoals();

        setGoals(data);
      } catch (err) {
        console.error('Fetch error', err);
      }
    }

    load();
  }, [goals]);

  const handleGoalCreate = (goal: Goal): void => {
    setGoals((prev) => [goal, ...prev]);
  };
  return (
    <div>
      <h1>My Goals</h1>
      <GoalForm onCreate={handleGoalCreate} />
      <GoalsList goals={goals} />
    </div>
  );
}
