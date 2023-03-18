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
  @Input() id: string = ''
  userToken = `Bearer ${this.auth.token}`

  config = {
    headers: {
      Authorization: this.userToken,
      'Content-Type': 'application/json'
    }
  }

  ngOnInit(): void {}

  deleteToken() {
    localStorage.clear()
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
        owner: localStorage.getItem('access_id')!,
        users: ['']
      }
      console.log(body)
      this.boardService.createBoard(body, this.config)
    } else {
      this.modal.closeNewBoard()
    }
  }
  submitCreateNewBoard() {
    document.querySelector('.modal-create-board')?.classList.remove('active')
  }
  toggleBurger() {
    let burger = document.querySelector('.collapsed') as HTMLElement
    let close = document.querySelector('.close') as HTMLElement
    burger.classList.toggle('active')
    close.classList.toggle('active')
  }
  closeBurger() {
    let burger = document.querySelector('.collapsed') as HTMLElement
    burger.classList.remove('active')
    let close = document.querySelector('.close') as HTMLElement
    close.classList.remove('active')
  }
}
