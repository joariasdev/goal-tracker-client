import ApiGoalsClient from "../api/apiGoalsClient";
import type { Goal, GoalAction } from "../models/Goal";
import { useForm, type SubmitHandler } from "react-hook-form";

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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Goal>({
    defaultValues: { id: selectedGoal.id, title: selectedGoal.title },
  });

  const onEditConfirm: SubmitHandler<Goal> = async (data: Goal) => {
    const { title } = data;
    const nextGoal: Goal = { ...selectedGoal, title };
    const updatedGoal = await ApiGoalsClient.update(selectedGoal.id, nextGoal);

    setStatus("viewing");
    dispatch({ type: "update", payload: updatedGoal });
  };

  return (
    <form onSubmit={handleSubmit(onEditConfirm)}>
      <div className="input-group fluid">
        {
          <input
            type="text"
            id="title"
            {...register("title", {
              required: { value: true, message: "This field can't be empty" },
            })}
          />
        }
        {errors.title && <span>{errors.title.message}</span>}
      </div>
      <div className="input-group fluid">
        <button className="primary">Save</button>
        <button type="button" onClick={handleEditCancel}>Cancel</button>
      </div>
    </form>
  );
}
