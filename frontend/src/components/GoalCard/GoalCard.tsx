export default function GoalCard({ goal }) {
  const percent = Math.min(100, (goal.current_value / goal.target_value) * 100);
  return (
    <div>
      <h3>{goal.title}</h3>
      <p>
        {goal.current_value} / {goal.target_value}
      </p>
      <div className="bar">
        <div className="fill" style={{ width: percent + '%' }} />
      </div>
      <div>{goal.completed_at && <span>Completed 🎉 </span>}</div>
    </div>
  );
}
