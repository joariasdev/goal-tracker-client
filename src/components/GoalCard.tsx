import { useState } from "react";
import type { Goal } from "../models/Goal";

interface GoalCardProps {
  goals: Goal[];
  id: number;
  syncWithDb: () => void;
}

export default function GoalCard({ goals, id, syncWithDb }: GoalCardProps) {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const selectedGoal = goals.filter((goal) => goal.id === id)[0];

  const handleDeleteClick = () => {
    setIsDeleting(true);
  };

  const handleDeleteConfirm = async (): Promise<Goal> => {
    const response = await fetch(`http://localhost:3000/goals/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result: Goal = await response.json();

    setIsDeleting(false);
    syncWithDb();

    return result;
  };

  const handleDeleteCancel = () => {
    setIsDeleting(false);
  };

  return (
    <div>
      {selectedGoal && (
        <div>
          <h3>Selected Goal: </h3>
          <p>{selectedGoal.title}</p>
          <button onClick={handleDeleteClick}>Delete</button>
        </div>
      )}
      {isDeleting && (
        <div>
          <p>Are you sure you want to delete this goal?</p>
          <button onClick={handleDeleteConfirm}>Yes</button>
          <button onClick={handleDeleteCancel}>Cancel</button>
        </div>
      )}
    </div>
  );
}
