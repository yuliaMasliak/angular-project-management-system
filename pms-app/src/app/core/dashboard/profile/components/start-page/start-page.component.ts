import { HttpClient } from '@angular/common/http'
import { Component, Input } from '@angular/core'
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
  title = 'instant-search'

  public searchInput: string = ''
  public tasks = []
  showAllColumns: boolean = false
  showAllBords: boolean = true
  allColumns: any = []

  ngOnInit() {
    this.boardService.getAllBoards().subscribe((data: any) => {
      this.boards = data
    })

    this.http
      .get(`${baseUrl}users/${localStorage.getItem('access_id')}`)
      .subscribe((data: any) => {
        this.name = data.name
      })
    this.http
      .get(`${baseUrl}columnsSet?userId=641023f05c10b743c91aad25`)
      .subscribe((data: any) => {
        this.allColumns = data
        console.log(this.allColumns)
      })
  }
  showColumns() {
    document.querySelector('.btn-all-boards')?.classList.remove('active')
    document.querySelector('.btn-all-columns')?.classList.add('active')
    this.showAllColumns = true
    this.showAllBords = false
  }
  showBoards() {
    document.querySelector('.btn-all-columns')?.classList.remove('active')
    document.querySelector('.btn-all-boards')?.classList.add('active')
    this.showAllColumns = false
    this.showAllBords = true
  }
  search() {
    let block = document.querySelector('.search-result') as HTMLElement
    block.innerHTML = ''
    this.http
      .get(`${baseUrl}tasksSet?search=${this.searchInput}`)
      .subscribe((data: any) => {
        if (data.length > 0) {
          data.forEach((el: any) => {
            this.http
              .get(`${baseUrl}boards/${el.boardId}`)
              .subscribe((boards: any) => {
                let link = document.createElement('div')
                link.classList.add('link')
                link.innerHTML =
                  'Task ' + el.title + ' board ' + boards.title + '</br>'
                link.style.color = 'blue'
                link.style.cursor = 'pointer'
                block.append(link)
                link.onclick = () => {
                  this.boardService.goToBoard(el.boardId)
                }
              })
          })
        } else {
          block.innerHTML = 'No tasks with such parameters'
        }
      })
  }
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
        board.innerHTML = data.title
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
  editProfile() {
    this.router.navigate(['dashboard/account'])
  }
}
