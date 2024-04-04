export type TodoItem = {
  id: number;
  text: string;
  isCompleted: boolean;
};

export type CheckFunc = {
  checkFunc: (todo: TodoItem) => void;
};

export type DeleteFunc = {
  deleteFunc: (id: number) => void;
};
