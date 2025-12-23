import type { Goal, GoalView } from "../models/Goal";

export default class ApiGoalsClient {
  private static BASE_URL: string = import.meta.env.VITE_API_URL;
  private static ENDPOINT: string = "/api/goals";

  static async getAll(): Promise<Goal[]> {
    const response = await fetch(this.BASE_URL + this.ENDPOINT);
    const result: Promise<Goal[]> = await response.json();
    return result;
  }

  static async getById(id: number): Promise<Goal> {
    const response = await fetch(`${this.BASE_URL + this.ENDPOINT}/${id}`);
    const result: Promise<Goal> = await response.json();
    return result;
  }

  static async create(goalBody: GoalView): Promise<Goal> {
    const response = await fetch(this.BASE_URL + this.ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(goalBody),
    });

    const result: Goal = await response.json();
    return result;
  }

  static async update(id: number, goalBody: Goal) {
    const response = await fetch(`${this.BASE_URL + this.ENDPOINT}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(goalBody),
    });

    const result: Goal = await response.json();
    return result;
  }

  static async delete(id: number) {
    const response = await fetch(`${this.BASE_URL + this.ENDPOINT}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result: Goal = await response.json();

    return result;
  }
}
