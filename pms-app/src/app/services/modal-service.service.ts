import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class ModalServiceService {
  value: boolean = false
  login: boolean = false
  name: boolean = false
  password: boolean = false
  delete: boolean = false
  newBoard: boolean = false
  boardTitle: boolean = false
  column: boolean = false

  constructor() {}
  openColumn() {
    this.column = true
  }
  open() {
    this.value = true
  }
  closeColumn() {
    this.column = false
  }
  close() {
    this.value = false
  }
  openNewBoard() {
    this.newBoard = true
  }
  openName() {
    this.name = true
  }
  openLogin() {
    this.login = true
  }
  openPassword() {
    this.password = true
  }
  openDelete() {
    this.delete = true
  }
  openEditBoardTitle() {
    this.boardTitle = true
  }
  closeName() {
    this.name = false
  }
  closeLogin() {
    this.login = false
  }
  closePassword() {
    this.password = false
  }
  closeDelete() {
    this.delete = false
  }
  closeNewBoard() {
    this.newBoard = false
  }
  closeEditBoardTitle() {
    this.boardTitle = false
  }
}
