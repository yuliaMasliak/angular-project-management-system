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
