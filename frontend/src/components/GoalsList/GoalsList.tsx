import React, { useState } from 'react';
import { apiDelete } from '../../api/client';
import type { Goal } from '../../api/goals.api';
import GoalCard from '../GoalCard/GoalCard';

import './style.css';
import { ConfirmationDialog } from '../ConfirmationDialog/ConfirmationDialog';

export function GoalsList({
  goals,
  setGoals,
}: {
  goals: Goal[];
  setGoals: React.Dispatch<React.SetStateAction<Goal[]>>;
}) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<Goal | null>(null);

  async function handleConfirmDelete(goal: Goal | null) {
    if (!goal) return;
    setGoals((prev) => prev.filter((item) => item.id != goal.id));
    try {
      await apiDelete(`/goals/${goal.id}`);
      setItemToDelete(null);
    } catch (error) {
      console.error(error);
    }
  }

  function handleDeleteClick(goal: Goal) {
    setItemToDelete(goal);
    setModalOpen(true);
  }

  function handleCloseModal() {
    setModalOpen(false);
    setItemToDelete(null);
  }

  return (
    <>
      <ul className="goals-list">
        <h1>GoalList</h1>
        {goals &&
          goals.map((goal, i) => (
            <li key={i}>
              <GoalCard goal={goal} deleteGoal={() => handleDeleteClick(goal)} />
            </li>
          ))}
      </ul>

      <ConfirmationDialog
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Are you sure?"
        message={`Do you really want to delete task "${itemToDelete?.title}"`}
        onConfirm={() => handleConfirmDelete(itemToDelete)}
      />
    </>
  );
}
