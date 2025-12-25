import { useState /* type ChangeEvent  type FormEvent */ } from "react";
import type { Goal, GoalAction } from "../models/Goal";
import ApiGoalsClient from "../api/apiGoalsClient";
import DeleteConfirmation from "./DeleteConfirmation";
import GoalEditForm from "./GoalEditForm";
import GoalDetail from "./GoalDetail";

interface GoalCardProps {
  goals: Goal[];
  id: number;
  dispatch: ({ type, payload }: GoalAction) => void;
}

type FormStatus = "viewing" | "editing" | "deleting";

export default function GoalCard({ goals, id, dispatch }: GoalCardProps) {
  const [status, setStatus] = useState<FormStatus>("viewing");

  const selectedGoal = goals.filter((goal) => goal.id === id)[0];

  const handleDeleteClick = () => {
    setStatus("deleting");
  };

  const handleCancelClick = () => {
    setStatus("viewing");
  };

  const handleEditClick = () => {
    setStatus("editing");
  };

  const handleDeleteConfirm = async () => {
    const deletedGoal = await ApiGoalsClient.delete(id);

    setStatus("viewing");
    dispatch({ type: "delete", payload: deletedGoal });
  };

  return (
    <>
      {selectedGoal && (
        <div>
          <div>
            <h3>Selected Goal: </h3>
            {status === "editing" ? (
              <GoalEditForm
                handleEditCancel={handleCancelClick}
                dispatch={dispatch}
                setStatus={setStatus}
                selectedGoal={selectedGoal}
              />
            ) : (
              <GoalDetail
                selectedGoal={selectedGoal}
                handleEditClick={handleEditClick}
                handleDeleteClick={handleDeleteClick}
              />
            )}
          </div>
          {status === "deleting" && (
            <DeleteConfirmation
              handleDeleteConfirm={handleDeleteConfirm}
              handleDeleteCancel={handleCancelClick}
            />
          )}
        </div>
      )}
    </>
  );
}
