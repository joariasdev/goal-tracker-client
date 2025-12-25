export interface GoalView {
  title: string;
}

export interface Goal extends GoalView {
  id: number;
}

export type GoalAction =
  | { type: "get"; payload: Goal[] }
  | { type: "create" | "update" | "delete"; payload: Goal };
