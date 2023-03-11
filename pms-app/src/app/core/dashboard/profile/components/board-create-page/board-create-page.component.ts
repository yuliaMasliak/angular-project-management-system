import { HttpClient } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop'
import { IBoardUser, IColumn } from 'src/app/models/interfaces'
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

  columns: IColumn[] = []

  drop(event: CdkDragDrop<IColumn[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      )
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      )
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
    this.columns.length = 0
    this.http
      .get(`${baseUrl}boards/${this.boardId}/columns`)
      .subscribe((data: any) => {
        data.forEach((col: any) => {
          this.columns.push(col)
        })

        this.modal.closeColumn()
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
      .delete(`${baseUrl}boards/${this.boardId}`)
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
      .put(`${baseUrl}boards/${this.boardId}`, body)
      .subscribe((data: any) => {
        this.modal.closeEditBoardTitle()
      })
  }

  addColumnModal() {
    this.modal.openColumn()
  }
  provideResultOfModalColumn(value: boolean) {
    if (value) {
      this.createColumn()
    } else {
      this.modal.closeColumn()
    }
  }
  createColumn() {
    const input = document.getElementById('title1') as HTMLInputElement

    const body = {
      title: input.value,
      order: 0
    }

    this.http
      .post(`${baseUrl}boards/${this.boardId}/columns`, body)
      .subscribe((data: any) => {
        this.columns.push(data)
        console.log(data)
        this.modal.closeColumn()
      })
  }
  getAllColumns() {
    this.columns.length = 0
    this.http
      .get(`${baseUrl}boards/${this.boardId}/columns`)
      .subscribe((data: any) => {
        data.forEach((col: any) => {
          this.columns.push(col)
        })

        this.modal.closeColumn()
      })
  }

  back() {
    this.router.navigate(['dashboard/start'])
  }
}
