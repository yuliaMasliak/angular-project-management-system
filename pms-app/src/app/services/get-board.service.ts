import { Injectable } from '@angular/core'
import { baseUrl } from 'src/environment/environment'
import { Router } from '@angular/router'
import { HttpClient } from '@angular/common/http'
import { AuthService } from './auth.service'
import {
  IBoard,
  IBoardCreate,
  IColumn,
  ITask,
  ITaskItem,
  TConfig
} from '../models/interfaces'
import { ModalServiceService } from './modal-service.service'
import { Observable } from 'rxjs/internal/Observable'
import { map } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class GetBoardService {
  constructor(
    private auth: AuthService,
    private http: HttpClient,
    private router: Router,
    public modal: ModalServiceService
  ) {}
  boardTitle: string = ''
  boardId: string = localStorage.getItem('board_id')!
  ownerId: string = ''
  boardToGoId: string = ''
  boards: IBoard[] = []
  columns: IColumn[] = []
  data: any = []
  tasksOfColumn: ITask[] = []

  createBoard(board: IBoardCreate, config: TConfig) {
    this.http.post(`${baseUrl}boards`, board, config).subscribe((data: any) => {
      this.boards.push(data)
      localStorage.setItem('board_id', data._id)
      this.boardTitle = data.title
      this.ownerId = data.owner
      this.modal.closeNewBoard()
      this.router.navigate(['dashboard/board'])
    })
  }

  getAllBoards() {
    const result = this.http.get(
      `${baseUrl}boardsSet/${localStorage.getItem('access_id')}`
    )
    this.http
      .get(`${baseUrl}boardsSet/${localStorage.getItem('access_id')}`)
      .subscribe((data: any) => {
        this.boards = data
      })
    return result
  }
  getColumns() {
    this.getFullData()
  }
  getFullData() {
    this.data.length = 0
    this.http
      .get(`${baseUrl}boards/${localStorage.getItem('board_id')}/columns`)
      .subscribe((columns: any) => {
        columns.forEach((column: any) => {
          let columnToAdd = {
            columnId: column._id,
            columnTitle: column.title,
            tasks: []
          }
          this.data.push(columnToAdd)

          this.http
            .get(
              `${baseUrl}boards/${localStorage.getItem('board_id')}/columns/${
                column._id
              }/tasks`
            )
            .subscribe((tasks: any) => {
              tasks.forEach((task: any) => {
                let taskToAdd = {
                  _id: task._id,
                  title: task.title,
                  description: task.description,
                  order: task.order,
                  columnId: task.columnId,
                  columnTitle: column.title
                }
                this.data.forEach((el: any) => {
                  if (el.columnId == task.columnId) {
                    el.tasks.push(taskToAdd)
                  }
                })
              })
            })
        })
      })
  }

  goToBoard(id: string) {
    const config = {
      headers: {
        Authorization: `Bearer ${this.auth.token}`,
        'Content-Type': 'application/json'
      }
    }

    localStorage.setItem('board_id', id)

    this.router.navigate(['dashboard/board'])
  }
  updateDraggedTasks(
    previousColumnId: string,
    currentColumnIid: string,
    draggedTask: any
  ) {
    let droppedTask = {
      title: '',
      order: 0,
      description: '',
      userId: localStorage.getItem('access_id'),
      users: ['']
    }

    this.data.forEach((el: any) => {
      if (el.columnId == previousColumnId.replace('columnId-', '')) {
        el.tasks.forEach((task: any) => {
          if (task._id == draggedTask.id.replace('task-', '')) {
            console.log(task._id)
            droppedTask.title = task.title
            droppedTask.description = task.description
          }
        })
      }
    })
    let result = ''
    this.http
      .post(
        `${baseUrl}boards/${localStorage.getItem(
          'board_id'
        )}/columns/${currentColumnIid.replace('columnId-', '')}/tasks`,
        droppedTask
      )
      .subscribe((data: any) => {
        result = data
      })

    this.http
      .delete(
        `${baseUrl}boards/${localStorage.getItem(
          'board_id'
        )}/columns/${currentColumnIid.replace(
          'columnId-',
          ''
        )}/tasks/${draggedTask.id.replace('task-', '')}`
      )
      .subscribe((data: any) => {
        result = data
      })
  }
}
