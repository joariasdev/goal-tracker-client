import type { Goal } from "../models/Goal";
import {type MouseEvent } from "react";

interface GoalListProps {
  goals: Goal[];
  onGoalClick: (event: MouseEvent<HTMLElement>) => void;
}

export default function GoalList({ goals, onGoalClick }: GoalListProps) {
  const goalElements = goals.map((g) => (
    <p key={g.id} id={String(g.id)} onClick={onGoalClick}>
      {g.title}
    </p>
  ));

  return <div>{goalElements}</div>;
}
