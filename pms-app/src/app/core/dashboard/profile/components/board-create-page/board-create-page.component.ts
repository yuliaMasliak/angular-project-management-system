import { HttpClient } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { config } from 'rxjs'
import { AuthService } from 'src/app/services/auth.service'
import { GetBoardService } from 'src/app/services/get-board.service'
import { baseUrl } from 'src/environment/environment'

@Component({
  selector: 'app-board-create-page',
  templateUrl: './board-create-page.component.html',
  styleUrls: ['./board-create-page.component.css']
})
export class BoardCreatePageComponent implements OnInit {
  constructor(
    private router: Router,
    private http: HttpClient,
    private boardService: GetBoardService,
    private auth: AuthService
  ) {}
  ngOnInit(): void {}
  boardTitle: string = this.boardService.boardTitle
  boardId: string = this.boardService.boardId

  userToken = `Bearer ${this.auth.token}`

  config = {
    headers: {
      Authorization: this.userToken
    }
  }

  modalDelete() {
    const modal = document.querySelector('.modal-delete-board') as HTMLElement
    modal.classList.add('active')
    const modalSubmit = document.querySelector(
      '.confirm-delete-board'
    ) as HTMLElement
    const modalCancel = document.querySelector(
      '.cancel-delete-board'
    ) as HTMLElement
    modalCancel.addEventListener('click', () => {
      modal.classList.remove('active')
    })
    modalSubmit.addEventListener('click', () => {
      this.deleteBoard()
      modal.classList.remove('active')
      this.router.navigate(['dashboard/start'])
    })
  }
  deleteBoard() {
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
