import { Component, Input } from '@angular/core'
import { Router } from '@angular/router'
import { TranslateService } from '@ngx-translate/core'
import { AuthService } from 'src/app/services/auth.service'
import { IBoard } from 'src/app/models/user'
import { Output } from '@angular/core'
import { baseUrl } from 'src/environment/environment'
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-header-user',
  templateUrl: './header-user.component.html',
  styleUrls: ['./header-user.component.css']
})
export class HeaderUserComponent {
  @Input() name: string = ''
  constructor(
    private router: Router,
    private http: HttpClient,
    public translate: TranslateService,
    private auth: AuthService
  ) {}

  id: string = ''
  userToken = `Bearer ${this.auth.token}`
  @Output() boards: IBoard[] = []

  config = {
    headers: {
      Authorization: this.userToken,
      'Content-Type': 'application/json'
    }
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
    this.http
      .post(`${baseUrl}boards`, body, this.config)
      .subscribe((data: any) => this.boards.push(data))
    document.querySelector('.modal-create-board')?.classList.remove('active')
    this.router.navigate(['dashboard/start'])
  }
}
