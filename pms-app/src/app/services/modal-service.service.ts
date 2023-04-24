import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalServiceService {
  public value: boolean = false;
  public login: boolean = false;
  public name: boolean = false;
  public password: boolean = false;
  public delete: boolean = false;
  public newBoard: boolean = false;
  public boardTitle: boolean = false;
  public column: boolean = false;
  public columnEdit: boolean = false;
  public columnDelete: boolean = false;
  public createTask: boolean = false;
  public editTask: boolean = false;
  public deleteTask: boolean = false;
  constructor() {}
  openDeleteTask() {
    this.deleteTask = true;
  }
  closeDeleteTask() {
    this.deleteTask = false;
  }
  openEditTask() {
    this.editTask = true;
  }
  closeEditTask() {
    this.editTask = false;
  }
  openCreateTask() {
    this.createTask = true;
  }
  closeCreateTask() {
    this.createTask = false;
  }
  openDeleteColumn() {
    this.columnDelete = true;
  }
  closeDeleteColumn() {
    this.columnDelete = false;
  }
  openEditColumn() {
    this.columnEdit = true;
  }
  closeEditColumn() {
    this.columnEdit = false;
  }
  openColumn() {
    this.column = true;
  }
  open() {
    this.value = true;
  }
  closeColumn() {
    this.column = false;
  }
  close() {
    this.value = false;
  }
  openNewBoard() {
    this.newBoard = true;
  }
  openName() {
    this.name = true;
  }
  openLogin() {
    this.login = true;
  }
  openPassword() {
    this.password = true;
  }
  openDelete() {
    this.delete = true;
  }
  openEditBoardTitle() {
    this.boardTitle = true;
  }
  closeName() {
    this.name = false;
  }
  closeLogin() {
    this.login = false;
  }
  closePassword() {
    this.password = false;
  }
  closeDelete() {
    this.delete = false;
  }
  closeNewBoard() {
    this.newBoard = false;
  }
  closeEditBoardTitle() {
    this.boardTitle = false;
  }
}
