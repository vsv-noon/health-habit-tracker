// import { apiDelete } from '../../api/client';
import { Link } from 'react-router-dom';
import type { Goal } from '../../services/api/goals.api';

import styles from './GoalCard.module.scss';

export default function GoalCard({ goal, deleteGoal }: { goal: Goal; deleteGoal: () => void }) {
  const percent = Math.min(100, (goal.current_value / goal.target_value) * 100);
  // async function handleGoalDelete(goal: Goal) {
  //   if (goal) {
  //     await apiDelete(`/goals/${goal.id}`);
  //   }
  // }
  return (
    <div className={styles.goalCard}>
      <Link to={`/goals/${goal.id}`} className={styles.h3}>
        <h3 className="goal-card-h3">{goal.title}</h3>
      </Link>
      <div>{goal.current_value === goal.target_value && <span>Completed 🎉 </span>}</div>

      <div className={styles.progressBar}>
        <p className={styles.barValue}>{goal.current_value}</p>

        <div className={styles.bar}>
          <div className={styles.barFill} style={{ width: percent + '%' }} />
        </div>
        <p className={styles.barValue}>{goal.target_value}</p>
      </div>
      <div onPointerDown={(e) => e.stopPropagation()}>
        <button onClick={deleteGoal}>Delete (CASCADE)</button>
      </div>
    </div>
  );
}
