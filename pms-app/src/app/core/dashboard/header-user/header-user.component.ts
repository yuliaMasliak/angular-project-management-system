import { Component, Input, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { TranslateService } from '@ngx-translate/core'
import { AuthService } from 'src/app/services/auth.service'
import { IBoard, IBoardUser } from 'src/app/models/interfaces'
import { Output } from '@angular/core'
import { baseUrl } from 'src/environment/environment'
import { HttpClient } from '@angular/common/http'
import { config } from 'rxjs'
import { GetBoardService } from 'src/app/services/get-board.service'
import { ModalServiceService } from 'src/app/services/modal-service.service'

@Component({
  selector: 'app-header-user',
  templateUrl: './header-user.component.html',
  styleUrls: ['./header-user.component.css']
})
export class HeaderUserComponent implements OnInit {
  constructor(
    private router: Router,
    private http: HttpClient,
    public translate: TranslateService,
    private auth: AuthService,
    private boardService: GetBoardService,
    public modal: ModalServiceService
  ) {}

  @Input() name: string = ''
  id = this.auth.id
  userToken = `Bearer ${this.auth.token}`

  config = {
    headers: {
      Authorization: this.userToken,
      'Content-Type': 'application/json'
    }
  }

  ngOnInit(): void {
    this.http.get(`${baseUrl}users`).subscribe((data: any) => {
      data.forEach((elem: IBoardUser) => {
        if (elem.login == this.auth.user.login) {
          this.name = elem.name
          this.id = elem._id
        }
      })
    })
  }

  deleteToken() {
    window.localStorage.removeItem('access_token')
    this.router.navigate(['../main/welcome'])
  }
  toMainPage() {
    this.router.navigate(['../main/welcome'])
  }
  editProfile() {
    this.router.navigate(['dashboard/account'])
  }
  createBoardModalOpen() {
    this.modal.openNewBoard()
  }
  toBoards() {
    this.router.navigate(['dashboard/start'])
  }

  provideResultOfModal(value: boolean) {
    if (value) {
      const input = document.getElementById('title1') as HTMLInputElement

      const body = {
        title: input.value,
        owner: this.id,
        users: ['']
      }

      this.boardService.createBoard(body, this.config)
    } else {
      this.modal.closeNewBoard()
    }
  }
  submitCreateNewBoard() {
    document.querySelector('.modal-create-board')?.classList.remove('active')
  }
}
