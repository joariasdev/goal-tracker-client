import { useState, type ChangeEvent, type FormEvent } from "react";
import type { Goal, GoalView } from "../models/Goal";

interface GoalCardProps {
  goals: Goal[];
  id: number;
  syncWithDb: () => void;
}

export default function GoalCard({ goals, id, syncWithDb }: GoalCardProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");

  const selectedGoal = goals.filter((goal) => goal.id === id)[0];

  const handleDeleteClick = () => {
    setIsDeleting(true);
  };

  const handleDeleteConfirm = async (): Promise<Goal> => {
    const response = await fetch(`http://localhost:3000/api/goals/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result: Goal = await response.json();

    setIsDeleting(false);
    syncWithDb();

    return result;
  };

  const handleDeleteCancel = () => {
    setIsDeleting(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setTitle(selectedGoal.title);
  };

  const handleEditConfirm = async (
    e: FormEvent<HTMLElement>
  ): Promise<Goal> => {
    e.preventDefault();

    const updatedGoal: GoalView = { title };

    const response = await fetch(`http://localhost:3000/api/goals/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedGoal),
    });

    const result: Goal = await response.json();

    setIsEditing(false);
    syncWithDb();

    return result;
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
                <button onClick={handleDeleteClick} className="secondary col-sm">
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
