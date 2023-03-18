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
  tasks: any = []

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
        console.log(this.boards)
      })
    return result
  }
  getColumns() {
    const result = this.http.get(
      `${baseUrl}boards/${localStorage.getItem('board_id')}/columns`
    )
    this.http
      .get(`${baseUrl}boards/${localStorage.getItem('board_id')}/columns`)
      .subscribe((data: any) => {
        this.columns = data
        console.log(this.columns)
      })
    return result
  }
  getAllTasks() {
    this.getColumns().subscribe((data: any) => {
      data.forEach((el: any) => {
        this.tasks.push(el)
        this.http
          .get(
            `${baseUrl}boards/${localStorage.getItem('board_id')}/columns/${
              el._id
            }/tasks`
          )
          .subscribe((task: any) => {
            this.tasks.forEach((elem: any) => {
              if (!task) {
                this.tasks[el].tasks = []
              }
              this.tasks[el].tasks.push(elem)
            })
          })
        console.log(this.tasks)
      })
    })
  }

  //   this.tasks.forEach((elem) => {
  //     this.tasks[el].tasks = [elem]
  //   })
  // })
  goToBoard(id: string) {
    const config = {
      headers: {
        Authorization: `Bearer ${this.auth.token}`,
        'Content-Type': 'application/json'
      }
    }

    localStorage.setItem('board_id', id)

    this.http.get(`${baseUrl}boards/${id}`, config).subscribe((data: any) => {
      this.boardTitle = data.title
      this.ownerId = data.owner
      this.router.navigate(['dashboard/board'])
    })
  }
}
