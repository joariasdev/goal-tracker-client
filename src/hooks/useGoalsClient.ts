import useAuthClient from "./useAuthClient";
import type { Goal, GoalView } from "../models/Goal";

const BASE_URL: string = import.meta.env.VITE_API_URL;
const ENDPOINT: string = "/api/goals";

export default function useGoalsClient() {
  const { authorizedFetch } = useAuthClient();

  async function getAllGoals(): Promise<Goal[]> {
    const response = await authorizedFetch(BASE_URL + ENDPOINT, {
      credentials: "include",
    });
    const result: Promise<Goal[]> = await response.json();
    return result;
  }

  async function getGoalById(id: number): Promise<Goal> {
    const response = await authorizedFetch(`${BASE_URL + ENDPOINT}/${id}`, {
      credentials: "include",
    });
    const result: Promise<Goal> = await response.json();
    return result;
  }

  async function createGoal(goalBody: GoalView): Promise<Goal> {
    const response = await authorizedFetch(BASE_URL + ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(goalBody),
    });

    const result: Goal = await response.json();
    return result;
  }

  async function updateGoal(id: number, goalBody: Goal) {
    const response = await authorizedFetch(`${BASE_URL + ENDPOINT}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(goalBody),
    });

    const result: Goal = await response.json();
    return result;
  }

  async function deleteGoal(id: number) {
    const response = await authorizedFetch(`${BASE_URL + ENDPOINT}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const result: Goal = await response.json();

    return result;
  }

  return { getAllGoals, getGoalById, createGoal, updateGoal, deleteGoal };
}
