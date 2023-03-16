import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop'
import { HttpClient } from '@angular/common/http'
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { IColumn, ITask } from 'src/app/models/interfaces'
import { AuthService } from 'src/app/services/auth.service'
import { ModalServiceService } from 'src/app/services/modal-service.service'
import { baseUrl } from 'src/environment/environment'

@Component({
  selector: 'app-columns',
  templateUrl: './columns.component.html',
  styleUrls: ['./columns.component.css']
})
export class ColumnsComponent implements OnInit {
  constructor(
    public modal: ModalServiceService,
    private http: HttpClient,
    private auth: AuthService
  ) {}
  @Input() columnID: string = ''
  @Input() columns: IColumn[] = []
  @Output() tasksGroup: ITask[] = []
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

  ngOnInit(): void {}

  drop(event: CdkDragDrop<ITask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      )
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      )
    }
  }

  taskToDelete: ITask = {
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
  @Output() classHidden: string = 'hidden'
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

  editTaskFulfill(task: ITask) {
    this.modal.openEditTask()
    this.taskToedit = task
  }
  deleteTaskFulfill(task: ITask) {
    this.modal.openDeleteTask()
    this.taskToDelete = task
  }

  provideResultOfModalEditTask(value: boolean) {
    if (value) {
      this.updateTask()
      this.modal.closeEditTask()
    } else {
      this.modal.closeEditTask()
    }
  }
  updateTask() {
    const title = document.getElementById('title1') as HTMLInputElement
    const desc = document.getElementById('description') as HTMLInputElement
    const body = {
      title: title.value,
      order: 0,
      description: desc.value,
      columnId: this.taskToedit.columnId,
      userId: this.taskToedit.userId,
      users: ['']
    }
    if (title.value == '') {
      body.title = this.taskToedit.title
    } else if (desc.value == '') {
      body.description = this.taskToedit.description
    }

    this.http
      .put(
        `${baseUrl}boards/${this.taskToedit.boardId}/columns/${this.taskToedit.columnId}/tasks/${this.taskToedit._id}`,
        body
      )
      .subscribe((data: any) => {
        console.log(data)
        let value = true
        this.successNewTask.emit(value)
        // let column = document.getElementById(this.columnToEditId) as HTMLElement
        // column.innerHTML = input.value
        this.modal.closeEditColumn()
      })
  }
  provideResultOfModalDeleteTask(value: boolean) {
    if (value) {
      this.deleteTask()
      this.modal.closeDeleteTask()
    } else {
      this.modal.closeDeleteTask()
    }
  }
  deleteTask() {
    this.http
      .delete(
        `${baseUrl}boards/${this.taskToDelete.boardId}/columns/${this.taskToDelete.columnId}/tasks/${this.taskToDelete._id}`
      )
      .subscribe((data: any) => {
        console.log(data)
        let value = true
        this.successNewTask.emit(value)
        // let column = document.getElementById(this.columnToEditId) as HTMLElement
        // column.innerHTML = input.value
        this.modal.closeDeleteColumn()
      })
  }
}
