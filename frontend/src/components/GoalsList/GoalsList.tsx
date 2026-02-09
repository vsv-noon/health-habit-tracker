import { apiDelete } from '../../api/client';
import type { Goal } from '../../api/goals.api';

export function GoalsList({ goals }: { goals: Goal[] }) {
  async function handleGoalDelete(goal: Goal) {
    if (goals) {
      await apiDelete(`/goals/${goal.id}`);
    }
  }

  return (
    <div>
      <h1>GoalList</h1>
      {goals &&
        goals.map((goal, i) => (
          <div key={i}>
            <h3>{goal.title}</h3>
            <button onClick={() => handleGoalDelete(goal)}>Delete (CASCADE)</button>
          </div>
        ))}
    </div>
  );
}
