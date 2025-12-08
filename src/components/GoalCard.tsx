import type { Goal } from "../models/Goal";

interface GoalCardProps {
  goals: Goal[];
  id: number;
}

export default function GoalCard({ goals, id }: GoalCardProps) {
  const selectedGoal = goals.filter((goal) => goal.id === id)[0];
  return (
    <div>
      <h3>Selected Goal: </h3>
      {selectedGoal && <p>{selectedGoal.title}</p>}
    </div>
  );
}
