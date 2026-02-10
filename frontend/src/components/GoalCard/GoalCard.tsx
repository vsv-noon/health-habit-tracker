// import { apiDelete } from '../../api/client';
import type { Goal } from '../../api/goals.api';

import './style.css';

export default function GoalCard({ goal, deleteGoal }: { goal: Goal; deleteGoal: () => void }) {
  const percent = Math.min(100, (goal.current_value / goal.target_value) * 100);
  // async function handleGoalDelete(goal: Goal) {
  //   if (goal) {
  //     await apiDelete(`/goals/${goal.id}`);
  //   }
  // }
  return (
    <li className="goal-card">
      <h3 className="goal-card-h3">{goal.title}</h3>
      <div>{goal.current_value === goal.target_value && <span>Completed 🎉 </span>}</div>

      <div className="goal-card-progress-bar">
        <p className="goal-card-bar-value">{goal.current_value}</p>

        <div className="goal-card-bar">
          <div className="goal-card-bar-fill" style={{ width: percent + '%' }} />
        </div>
        <p className="goal-card-bar-value">{goal.target_value}</p>
      </div>
      <button onClick={deleteGoal}>Delete (CASCADE)</button>
    </li>
  );
}
