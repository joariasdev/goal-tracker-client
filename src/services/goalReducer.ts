import type { Goal, GoalAction } from "../models/Goal";

export default function goalsReducer(prevState: Goal[], action: GoalAction) {
  switch (action.type) {
    case "get":
      return action.payload;
    case "create":
      return [...prevState, action.payload];
    case "update":
      return prevState.map((goal) => {
        return goal.id === action.payload.id ? action.payload : goal;
      });
    case "delete":
      return prevState.filter((goal) => goal.id !== action.payload.id);
    default:
      return prevState;
  }
}
