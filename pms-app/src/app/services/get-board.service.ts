import { Injectable } from '@angular/core'
import { baseUrl } from 'src/environment/environment'
import { Router } from '@angular/router'
import { HttpClient } from '@angular/common/http'
import { AuthService } from './auth.service'
import { IBoardCreate, TConfig } from '../models/user'
import { ModalServiceService } from './modal-service.service'

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
  boardId: string = ''
  ownerId: string = ''
  boardToGoId: string = ''

  createBoard(board: IBoardCreate, config: TConfig) {
    this.http.post(`${baseUrl}boards`, board, config).subscribe((data: any) => {
      this.boardTitle = data.title
      this.boardId = data._id
      this.ownerId = data.owner
      this.modal.closeNewBoard()
      this.router.navigate(['dashboard/board'])
    })
  }
  goToBoard(id: string) {
    const config = {
      headers: {
        Authorization: `Bearer ${this.auth.token}`,
        'Content-Type': 'application/json'
      }
    }

    this.boardToGoId = id
    this.http.get(`${baseUrl}boards/${id}`, config).subscribe((data: any) => {
      this.boardId = data._id
      this.boardTitle = data.title
      this.ownerId = data.owner
      this.router.navigate(['dashboard/board'])
    })
  }
}
