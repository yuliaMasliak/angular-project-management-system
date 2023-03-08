import { HttpClient } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from 'src/app/services/auth.service'
import { GetBoardService } from 'src/app/services/get-board.service'
import { baseUrl } from 'src/environment/environment'

@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.css']
})
export class BoardPageComponent implements OnInit {
  constructor(
    private router: Router,
    private http: HttpClient,
    private boardService: GetBoardService,
    private auth: AuthService
  ) {}
  boardId: string = ''
  boardTitle: string = ''

  userToken = `Bearer ${this.auth.token}`

  config = {
    headers: {
      Authorization: this.userToken
    }
  }
  ngOnInit(): void {
    this.boardId = this.boardService.boardToGoId
    this.http
      .get(`${baseUrl}boards/${this.boardId}`, this.config)
      .subscribe((data: any) => {
        this.boardTitle = data.title
      })
  }
  deleteCurrentBoardAsk() {
    const modal = document.querySelector(
      '.modal-delete-current-board'
    ) as HTMLElement
    modal.classList.add('active')
    const modalSubmit = document.querySelector(
      '.confirm-delete-current-board'
    ) as HTMLElement
    const modalCancel = document.querySelector(
      '.cancel-delete-current-board'
    ) as HTMLElement
    modalCancel.addEventListener('click', () => {
      modal.classList.remove('active')
    })
    modalSubmit.addEventListener('click', () => {
      this.deleteCurrentBoard()
      modal.classList.remove('active')
      this.router.navigate(['dashboard/start'])
    })
  }
  deleteCurrentBoard() {
    this.http
      .delete(`${baseUrl}boards/${this.boardId}`, this.config)
      .subscribe((data: any) => {
        this.router.navigate(['dashboard/start'])
      })
  }
  back() {
    this.router.navigate(['dashboard/start'])
  }
}
