import type { Goal } from "../models/Goal";
import { type MouseEvent } from "react";

interface GoalListProps {
  goals: Goal[];
  onGoalClick: (event: MouseEvent<HTMLElement>) => void;
}

export default function GoalList({ goals, onGoalClick }: GoalListProps) {
  const goalElements = goals.map((g) => (
    <div key={g.id} className="card fluid">
      <p id={String(g.id)} onClick={onGoalClick}>
        {g.title}
      </p>
    </div>
  ));

  return (
    <div>
      <h1>Goals</h1>
      {goalElements}
    </div>
  );
}
