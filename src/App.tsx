import GoalCard from "./components/GoalCard";
import GoalForm from "./components/GoalForm";
import GoalList from "./components/GoalList";
import { useEffect, useReducer, useState, type MouseEvent } from "react";
import ApiGoalsClient from "./api/apiGoalsClient";
import goalsReducer from "./services/goalReducer";

function App() {
  const [goals, dispatch] = useReducer(goalsReducer, []);
  const [selectedGoalId, setSelectedGoalId] = useState<number>(0);

  const handleGoalClick = (event: MouseEvent<HTMLElement>) => {
    setSelectedGoalId(Number(event.currentTarget.id));
  };

  useEffect(() => {
    async function getGoals() {
      const fetchedGoals = await ApiGoalsClient.getAll();
      dispatch({ type: "get", payload: fetchedGoals });
    }
    getGoals();
  }, []);

  return (
    <main>
      <GoalList goals={goals} onGoalClick={handleGoalClick} />
      <GoalForm dispatch={dispatch} />
      <GoalCard goals={goals} id={selectedGoalId} dispatch={dispatch} />
    </main>
  );
}

export default App;
