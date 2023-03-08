import { HttpClient } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { config } from 'rxjs'
import { IBoardUser } from 'src/app/models/user'
import { AuthService } from 'src/app/services/auth.service'
import { GetBoardService } from 'src/app/services/get-board.service'
import { ModalServiceService } from 'src/app/services/modal-service.service'
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
    private auth: AuthService,
    public modal: ModalServiceService
  ) {}
  boardTitle: string = this.boardService.boardTitle
  boardId: string = this.boardService.boardId
  class: string = ''
  userToken = `Bearer ${this.auth.token}`
  name: string = ''
  id = this.auth.id
  config = {
    headers: {
      Authorization: this.userToken
    }
  }
  ngOnInit(): void {
    this.http.get(`${baseUrl}users`, this.config).subscribe((data: any) => {
      data.forEach((elem: IBoardUser) => {
        if (elem.login == this.auth.user.login) {
          this.name = elem.name
          this.id = elem._id
        }
      })
    })
  }

  modalDelete() {
    this.modal.open()
    this.class = 'hidden'
  }
  provideResultOfModal(value: boolean) {
    if (value) {
      this.deleteBoard()
    } else {
      this.modal.close()
    }
  }

  deleteBoard() {
    this.http
      .delete(`${baseUrl}boards/${this.boardId}`, this.config)
      .subscribe((data: any) => {
        this.modal.close()
        this.router.navigate(['dashboard/start'])
      })
  }
  editBoardTitle() {
    this.modal.openEditBoardTitle()
  }
  provideResultOfModalEdit(value: boolean) {
    if (value) {
      this.updateBoard()
    } else {
      this.modal.closeEditBoardTitle()
    }
  }
  updateBoard() {
    const input = document.getElementById('title1') as HTMLInputElement
    this.boardTitle = input.value
    const body = {
      title: input.value,
      owner: this.id,
      users: ['']
    }
    this.http
      .put(`${baseUrl}boards/${this.boardId}`, body, this.config)
      .subscribe((data: any) => {
        this.modal.closeEditBoardTitle()
      })
  }
  back() {
    this.router.navigate(['dashboard/start'])
  }
}
