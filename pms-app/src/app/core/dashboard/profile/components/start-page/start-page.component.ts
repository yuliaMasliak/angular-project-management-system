import { HttpClient } from '@angular/common/http'
import { Component } from '@angular/core'
import { IBoard, IBoardUser } from 'src/app/models/user'
import { AuthService } from 'src/app/services/auth.service'
import { baseUrl } from 'src/environment/environment'
import { Output } from '@angular/core'
import { Router } from '@angular/router'
import { GetBoardService } from 'src/app/services/get-board.service'

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.css']
})
export class StartPageComponent {
  constructor(
    private auth: AuthService,
    private http: HttpClient,
    private router: Router,
    private boardService: GetBoardService
  ) {}
  name: string = ''
  id: string = ''
  boardId: string = this.boardService.boardId
  userToken = `Bearer ${this.auth.token}`
  @Output() boards: IBoard[] = []

  config = {
    headers: {
      Authorization: this.userToken,
      'Content-Type': 'application/json'
    }
  }
  ngOnInit() {
    // console.log(this.auth.token)

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
                  this.boards.push(el)
                }
              })
            )
        }
      })
    })
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
    const input = document.getElementById('title') as HTMLInputElement

    const body = {
      title: input.value,
      owner: this.id,
      users: ['']
    }
    this.boardService.createBoard(body, this.config)
    document.querySelector('.modal-create-board')?.classList.remove('active')
  }
  toBoard(id: string) {
    this.boardService.goToBoard(id)
  }
}
