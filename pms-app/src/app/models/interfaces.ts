export interface IUser {
  name: string
  login: string
  password: string
}
export interface IUserToLogin {
  login: string
  password: string
}
export interface IBoard {
  _id: string
  title: string
  owner: string
  users: [string]
}
export interface IBoardUser {
  _id: string
  name: string
  login: string
}
export interface IBoardCreate {
  title: string
  owner: string
  users: string[]
}
export type TConfig = {
  headers: {
    Authorization: string
    'Content-Type': string
  }
}
export interface IColumn {
  _id: string
  title: string
  order: number
  boardId: string
}
export interface ITask {
  _id: string
  title: string
  order: 0
  boardId: string
  columnId: string
  description: string
  userId: string
  users: [string]
}
export interface ITask {
  _id: string
  title: string
  order: 0
  boardId: string
  columnId: string
  description: string
  userId: string
  users: [string]
  tasks?: [ITask]
}
export interface ITaskItem {
  columnId: string
  columnTitle?: string
  description: string
  order: number
  title: string
  _id: string
}
