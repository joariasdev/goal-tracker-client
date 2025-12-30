import ApiGoalsClient from "../api/apiGoalsClient";
import type { GoalAction, GoalView } from "../models/Goal";
import { useForm, type SubmitHandler } from "react-hook-form";

interface GoalFormProps {
  dispatch: ({ type, payload }: GoalAction) => void;
}

export default function GoalForm({ dispatch }: GoalFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<GoalView>();

  const onSubmit: SubmitHandler<GoalView> = async (data: GoalView) => {
    const { title } = data;
    const createdGoal = await ApiGoalsClient.create({ title });
    reset();
    dispatch({ type: "create", payload: { ...createdGoal } });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="input-group vertical">
        <label htmlFor="title">Add new goal: </label>
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
        <input type="submit" value="Save" className="primary" />
      </form>
    </div>
  );
}
