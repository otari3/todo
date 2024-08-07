export interface Board {
  boards: BoardElement[];
}

export interface BoardElement {
  _id: string | null | undefined;
  name: string | null | undefined;
  columns: Column[];
}

export interface Column {
  name?: string;
  tasks: Task[];
}

export interface Task {
  _id: string | null | undefined;
  title: string | null | undefined;
  description: string | null | undefined;
  status: string | null | undefined;
  subtasks: Subtask[];
}

export enum Status {
  Doing = 'Doing',
  Done = 'Done',
  Empty = '',
  Todo = 'Todo',
}

export interface Subtask {
  title: string;
  isCompleted: boolean;
}
