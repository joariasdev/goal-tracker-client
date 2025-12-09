import GoalCard from "./components/GoalCard";
import GoalForm from "./components/GoalForm";
import GoalList from "./components/GoalList";
import { useEffect, useState, type MouseEvent } from "react";
import type { Goal } from "./models/Goal";

function App() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [resfreshKey, setRefreshKey] = useState<number>(0);
  const [selectedGoalId, setSelectedGoalId] = useState<number>(0);

  const handleRefresh = () => {
    setRefreshKey((prevRefresh) => prevRefresh + 1);
  };

  const handleGoalClick = (event: MouseEvent<HTMLElement>) => {
    setSelectedGoalId(Number(event.currentTarget.id));
  };

  useEffect(() => {
    async function getGoals(url: string) {
      const response = await fetch(url);
      const result: Promise<Goal[]> = await response.json();
      setGoals(await result);
    }

    getGoals("http://localhost:3000/goals");
  }, [resfreshKey]);

  return (
    <main>
      <GoalList goals={goals} onGoalClick={handleGoalClick} />
      <GoalForm syncWithDb={handleRefresh} />
      <GoalCard goals={goals} id={selectedGoalId} syncWithDb={handleRefresh} />
    </main>
  );
}

export default App;
