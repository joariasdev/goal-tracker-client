import { useState, type ChangeEvent, type FormEvent } from "react";
import ApiGoalsClient from "../api/apiGoalsClient";
import type { Goal, GoalAction } from "../models/Goal";

type FormStatus = "viewing" | "editing" | "deleting";

interface GoalEditFormProps {
  handleEditCancel: () => void;
  dispatch: (action: GoalAction) => void;
  setStatus: (status: FormStatus) => void;
  selectedGoal: Goal;
}

export default function GoalEditForm({
  handleEditCancel,
  dispatch,
  setStatus,
  selectedGoal,
}: GoalEditFormProps) {
  const [title, setTitle] = useState<string>(selectedGoal.title);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setTitle(event.target.value);
  };

  const handleEditConfirm = async (e: FormEvent<HTMLElement>) => {
    e.preventDefault();

    const nextGoal: Goal = { ...selectedGoal, title };
    const updatedGoal = await ApiGoalsClient.update(selectedGoal.id, nextGoal);

    setStatus("viewing");
    dispatch({ type: "update", payload: updatedGoal });
  };

  return (
    <form>
      <div className="input-group fluid">
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={handleChange}
        />
      </div>
      <div className="input-group fluid">
        <button onClick={handleEditConfirm} className="primary">
          Save
        </button>
        <button onClick={handleEditCancel}>Cancel</button>
      </div>
    </form>
  );
}
