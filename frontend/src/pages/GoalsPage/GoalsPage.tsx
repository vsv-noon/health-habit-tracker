import { useEffect, useState } from 'react';
import { fetchGoals, type Goal } from '../../services/api/goals.api';
import { GoalForm } from '../../components/GoalForm/GoalForm';
import { GoalsList } from '../../components/GoalsList/GoalsList';
import Loader from '../../components/Loader/Loader';

export default function GoalsPage() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function loadGoals() {
      try {
        setLoading(true);
        const data = await fetchGoals();

        setGoals(data);
      } catch (err) {
        console.error('Fetch error', err);
      } finally {
        setLoading(false);
      }
    }

    loadGoals();
  }, []);

  const handleGoalCreate = (goal: Goal): void => {
    setGoals((prev) => [goal, ...prev]);
  };
  return (
    <div>
      <h1>My Goals</h1>
      {loading && <Loader />}
      <GoalForm onCreate={handleGoalCreate} />
      <GoalsList goals={goals} setGoals={setGoals} />
    </div>
  );
}
