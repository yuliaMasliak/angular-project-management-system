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
