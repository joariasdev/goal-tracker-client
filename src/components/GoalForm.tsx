import { useState, type ChangeEvent, type FormEvent } from "react";
import ApiGoalsClient from "../api/apiGoalsClient";
import type { GoalAction } from "../models/Goal";

interface GoalFormProps {
  dispatch: ({ type, payload }: GoalAction) => void;
}

export default function GoalForm({ dispatch }: GoalFormProps) {
  const [title, setTitle] = useState<string>("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setTitle(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const createdGoal = await ApiGoalsClient.create({ title });

    setTitle("");

    dispatch({ type: "create", payload: { ...createdGoal } });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="input-group vertical">
        <label htmlFor="title">Add new goal: </label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={handleChange}
        />
        <input type="submit" value="Save" className="primary" />
      </form>
    </div>
  );
}
