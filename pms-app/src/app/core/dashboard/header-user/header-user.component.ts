import { Component, Input, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { TranslateService } from '@ngx-translate/core'
import { AuthService } from 'src/app/services/auth.service'
import { IBoard, IBoardUser } from 'src/app/models/user'
import { Output } from '@angular/core'
import { baseUrl } from 'src/environment/environment'
import { HttpClient } from '@angular/common/http'
import { config } from 'rxjs'
import { GetBoardService } from 'src/app/services/get-board.service'

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
    private boardService: GetBoardService
  ) {}

  @Input() name: string = ''
  id = ''
  userToken = `Bearer ${this.auth.token}`

  config = {
    headers: {
      Authorization: this.userToken,
      'Content-Type': 'application/json'
    }
  }

  ngOnInit(): void {
    this.http.get(`${baseUrl}users`, this.config).subscribe((data: any) => {
      data.forEach((elem: IBoardUser) => {
        if (elem.login == this.auth.user.login) {
          this.name = elem.name
          this.http
            .get(`${baseUrl}boards`, this.config)
            .subscribe((data: any) =>
              data.forEach((el: IBoard) => {
                if (el.owner === elem._id) {
                  this.id = elem._id
                }
              })
            )
        }
      })
    })
  }

  deleteToken() {
    window.localStorage.clear()
    this.router.navigate(['../main/welcome'])
  }
  toMainPage() {
    this.router.navigate(['../main/welcome'])
  }
  editProfile() {
    this.router.navigate(['dashboard/account'])
  }
  createNewBoard() {
    document.getElementById('create-new-board')?.classList.add('active')
  }
  toBoards() {
    this.router.navigate(['dashboard/start'])
  }
  cancelCreateNewBoard() {
    document
      .querySelector('.cancel-create-board')
      ?.addEventListener('click', () => {
        document
          .querySelector('.modal-create-board')
          ?.classList.remove('active')
      })
  }
  submitCreateNewBoard() {
    const input = document.getElementById('title1') as HTMLInputElement

    const body = {
      title: input.value,
      owner: this.id,
      users: ['']
    }
    this.boardService.createBoard(body, this.config)
    document.querySelector('.modal-create-board')?.classList.remove('active')
  }
}
