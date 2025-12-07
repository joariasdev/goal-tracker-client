import { useEffect, useState } from "react";
import type { Goal } from "../models/Goal";

export default function GoalList() {
  const [goals, setGoals] = useState<Goal[]>([]);

  useEffect(() => {
    async function getGoals(url: string) {
      const response = await fetch(url);
      const result: Promise<Goal[]> = await response.json();
      setGoals(await result);
    }

    getGoals("http://localhost:3000/goals");
  }, [goals]);

  const goalElements = goals.map((g) => <p key={g.id}>{g.title}</p>);

  return <div>{goalElements}</div>;
}
