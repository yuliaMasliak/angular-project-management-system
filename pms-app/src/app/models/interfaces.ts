export interface User {
  name: string;
  login: string;
  password: string;
}

export interface Board {
  _id: string;
  title: string;
  owner: string;
  users: [string];
}

export interface BoardCreate {
  title: string;
  owner: string;
  users: string[];
}
export type TConfig = {
  headers: {
    Authorization: string;
    'Content-Type': string;
  };
};
export interface Column {
  _id: string;
  title: string;
  order: number;
  boardId: string;
}

export interface Task {
  _id: string;
  title: string;
  order: 0;
  boardId: string;
  columnId: string;
  description: string;
  userId: string;
  users: [string];
  tasks?: [Task];
}
export interface TaskItem {
  columnId: string;
  columnTitle?: string;
  description: string;
  order: number;
  title: string;
  _id: string;
}
