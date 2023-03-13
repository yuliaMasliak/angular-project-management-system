import { HttpClient } from '@angular/common/http'
import { Component } from '@angular/core'
import { IBoard, IBoardUser, IColumn } from 'src/app/models/interfaces'
import { AuthService } from 'src/app/services/auth.service'
import { baseUrl } from 'src/environment/environment'
import { Output } from '@angular/core'
import { Router } from '@angular/router'
import { GetBoardService } from 'src/app/services/get-board.service'
import { ModalServiceService } from 'src/app/services/modal-service.service'
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop'

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
    private boardService: GetBoardService,
    public modal: ModalServiceService
  ) {}
  name: string = ''
  id: string = ''
  boardId: string = this.boardService.boardId
  @Output() boards: IBoard[] = []
  boardTitle: string = this.boardService.boardTitle
  boardToEdit: string = ''
  class: string = ''

  ngOnInit() {
    this.http.get(`${baseUrl}users`).subscribe((data: any) => {
      data.forEach((elem: IBoardUser) => {
        if (elem._id == this.auth.user.id) {
          this.http
            .get(`${baseUrl}boardsSet/${this.auth.user.id}`)
            .subscribe((data: any) => {
              data.forEach((elem: any) => {
                this.boards.push(elem)
              })
            })
          this.name = elem.name
        }
      })
    })
  }

  //           this.http.get(`${baseUrl}boards`).subscribe((data: any) =>
  //             data.forEach((el: IBoard) => {
  //               console.log(el)
  //               if (el.owner === elem._id) {
  //                 console.log(el.owner)
  //                 this.id = elem._id
  //                 this.boards.push(el)
  //               }
  //             })
  // )

  toBoard(id: string) {
    this.boardService.goToBoard(id)
  }

  editBoardTitle(id: string) {
    this.modal.openEditBoardTitle()
    this.boardToEdit = id
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
      owner: this.auth.user.id!,
      users: ['']
    }
    this.http
      .put(`${baseUrl}boards/${this.boardToEdit}`, body)
      .subscribe((data: any) => {
        let board = document.getElementById(this.boardToEdit) as HTMLElement
        board.innerHTML = input.value
        this.modal.closeEditBoardTitle()
      })
  }
  modalDelete(id: string) {
    this.modal.open()
    this.class = 'hidden'
    this.boardToEdit = id
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
      .delete(`${baseUrl}boards/${this.boardToEdit}`)
      .subscribe((data: any) => {
        let board = document.getElementById(
          `board-${this.boardToEdit}`
        ) as HTMLElement
        board.remove()
        this.modal.close()
      })
  }
  drop(event: CdkDragDrop<IBoard[]>) {
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
}
