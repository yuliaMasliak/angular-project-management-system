import { HttpClient } from '@angular/common/http'
import { Component, EventEmitter, Input, Output } from '@angular/core'
import { IColumn, ITask } from 'src/app/models/interfaces'
import { AuthService } from 'src/app/services/auth.service'
import { ModalServiceService } from 'src/app/services/modal-service.service'
import { baseUrl } from 'src/environment/environment'

@Component({
  selector: 'app-columns',
  templateUrl: './columns.component.html',
  styleUrls: ['./columns.component.css']
})
export class ColumnsComponent {
  constructor(
    public modal: ModalServiceService,
    private http: HttpClient,
    private auth: AuthService
  ) {}
  @Input() columns: IColumn[] = []
  @Output() tasks: ITask[] = []
  columnToEditId: string = ''
  columnTitle: string = ''
  @Input() boardId: string = ''
  @Output() columnId: string = ''
  taskToedit: ITask = {
    _id: '',
    title: '',
    order: 0,
    boardId: '',
    columnId: '',
    description: '',
    userId: '',
    users: ['']
  }
  class: string = ''
  @Output() classDesc: string = 'active'
  @Output() successNewTask = new EventEmitter()

  editColumnTitle(id: string) {
    this.modal.openEditColumn()
    this.columnToEditId = id
  }
  provideResultOfModalEdit(value: boolean) {
    if (value) {
      this.updateColumn()
    } else {
      this.modal.closeEditColumn()
    }
  }
  updateColumn() {
    const input = document.getElementById('title1') as HTMLInputElement
    this.columnTitle = input.value
    const body = {
      title: input.value,
      order: 0
    }
    this.http
      .put(
        `${baseUrl}boards/${this.boardId}/columns/${this.columnToEditId}`,
        body
      )
      .subscribe((data: any) => {
        let column = document.getElementById(this.columnToEditId) as HTMLElement
        column.innerHTML = input.value
        this.modal.closeEditColumn()
      })
  }

  modalDelete(id: string) {
    this.modal.openDeleteColumn()
    this.class = 'hidden'
    this.columnToEditId = id
  }
  provideResultOfModalDelete(value: boolean) {
    if (value) {
      this.deleteColumn()
    } else {
      this.modal.closeDeleteColumn()
    }
  }

  deleteColumn() {
    this.http
      .delete(`${baseUrl}boards/${this.boardId}/columns/${this.columnToEditId}`)
      .subscribe((data: any) => {
        let column = document.getElementById(
          `column-${this.columnToEditId}`
        ) as HTMLElement
        column.remove()
        this.modal.closeDeleteColumn()
      })
  }
  openModalTask(columnId: string) {
    this.columnId = columnId
    this.modal.openCreateTask()
  }
  provideResultOfModalCreateTask(value: boolean) {
    if (value) {
      this.createTask()
    } else {
      this.modal.closeCreateTask()
    }
  }
  createTask() {
    const input = document.getElementById('title1') as HTMLInputElement
    const description = document.getElementById(
      'description'
    ) as HTMLInputElement
    const body = {
      title: input.value,
      order: 0,
      description: description.value,
      userId: this.auth.user.id,
      users: ['string']
    }
    let boardId = localStorage.getItem('board_id')!

    this.http
      .post(`${baseUrl}boards/${boardId}/columns/${this.columnId}/tasks`, body)
      .subscribe((data: any) => {
        console.log(data)
        let value = true
        this.successNewTask.emit(value)
        this.modal.closeCreateTask()
      })
  }
  provideResultOfModalEditTask(value: boolean) {
    if (value) {
      this.updateTask()
      this.modal.closeEditTask()
    } else {
      this.modal.closeEditTask()
    }
  }
  editTaskFulfil(task: ITask) {
    this.taskToedit = task
    console.log(this.taskToedit)
  }
  updateTask() {}
}
