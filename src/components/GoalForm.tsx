import { useState, type ChangeEvent, type FormEvent } from "react";
import { type Goal, type GoalView } from "../models/Goal";

interface GoalFormProps {
  syncWithDb: () => void;
}

export default function GoalForm({ syncWithDb }: GoalFormProps) {
  const [title, setTitle] = useState<string>("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setTitle(event.target.value);
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<Goal> => {
    event.preventDefault();

    const goalData: GoalView = { title };

    const response = await fetch("http://localhost:3000/goals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(goalData),
    });

    const result: Goal = await response.json();

    setTitle("");
    syncWithDb();

    return result;
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Add new goal: </label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={handleChange}
        />
        <input type="submit" value="Save" />
      </form>
    </div>
  );
}
