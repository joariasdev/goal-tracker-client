import { useState, type ChangeEvent, type FormEvent } from "react";
import type { Goal, GoalAction } from "../models/Goal";
import ApiGoalsClient from "../api/apiGoalsClient";

interface GoalCardProps {
  goals: Goal[];
  id: number;
  dispatch: ({ type, payload }: GoalAction) => void;
}

export default function GoalCard({ goals, id, dispatch }: GoalCardProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");

  const selectedGoal = goals.filter((goal) => goal.id === id)[0];

  const handleDeleteClick = () => {
    setIsDeleting(true);
  };

  const handleDeleteConfirm = async () => {
    const deletedGoal = await ApiGoalsClient.delete(id);

    setIsDeleting(false);
    dispatch({ type: "delete", payload: deletedGoal });
  };

  const handleDeleteCancel = () => {
    setIsDeleting(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setTitle(selectedGoal.title);
  };

  const handleEditConfirm = async (e: FormEvent<HTMLElement>) => {
    e.preventDefault();

    const nextGoal: Goal = { ...selectedGoal, title };
    const updatedGoal = await ApiGoalsClient.update(id, nextGoal);

    setIsEditing(false);
    dispatch({ type: "update", payload: updatedGoal });
  };

  const handleEditCancel = () => {
    setIsEditing(false);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setTitle(event.target.value);
  };

  return (
    <>
      {selectedGoal && (
        <div>
          <div>
            <h3>Selected Goal: </h3>
            {isEditing ? (
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
            ) : (
              <div className="input-group vertical container">
                <p>{selectedGoal.title}</p>
                <div className="row fluid">
                  <button onClick={handleEditClick} className="tertiary col-sm">
                    Edit
                  </button>
                  <button
                    onClick={handleDeleteClick}
                    className="secondary col-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
          {isDeleting && (
            <div>
              <p>Are you sure you want to delete this goal?</p>
              <button onClick={handleDeleteConfirm} className="secondary">
                Yes
              </button>
              <button onClick={handleDeleteCancel}>Cancel</button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
