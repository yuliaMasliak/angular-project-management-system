import { Injectable } from '@angular/core'
import { baseUrl } from 'src/environment/environment'
import { Router } from '@angular/router'
import { HttpClient } from '@angular/common/http'
import { AuthService } from './auth.service'
import { IBoard, IBoardCreate, TConfig } from '../models/interfaces'
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
    return this.http
      .get(`${baseUrl}boardsSet/${localStorage.getItem('access_id')}`)
      .pipe(map((res) => res))
  }
  getColumns() {
    return this.http
      .get(`${baseUrl}boards/${localStorage.getItem('board_id')}/columns`)
      .pipe(map((res) => res))
  }

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
