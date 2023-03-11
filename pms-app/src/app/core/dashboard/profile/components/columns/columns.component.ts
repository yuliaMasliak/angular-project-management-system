import { HttpClient } from '@angular/common/http'
import { Component, Input } from '@angular/core'
import { IColumn } from 'src/app/models/interfaces'
import { AuthService } from 'src/app/services/auth.service'
import { ModalServiceService } from 'src/app/services/modal-service.service'
import { baseUrl } from 'src/environment/environment'

@Component({
  selector: 'app-columns',
  templateUrl: './columns.component.html',
  styleUrls: ['./columns.component.css']
})
export class ColumnsComponent {
  constructor(
    public modal: ModalServiceService,
    private http: HttpClient,
    private auth: AuthService
  ) {}
  @Input() columns: IColumn[] = []
  columnToEditId: string = ''
  columnTitle: string = ''
  @Input() boardId: string = ''

  class: string = ''
  editColumnTitle(id: string) {
    this.modal.openEditColumn()
    this.columnToEditId = id
  }
  provideResultOfModalEdit(value: boolean) {
    if (value) {
      this.updateColumn()
    } else {
      this.modal.closeEditColumn()
    }
  }
  updateColumn() {
    const input = document.getElementById('title1') as HTMLInputElement
    this.columnTitle = input.value
    const body = {
      title: input.value,
      order: 0
    }
    this.http
      .put(
        `${baseUrl}boards/${this.boardId}/columns/${this.columnToEditId}`,
        body
      )
      .subscribe((data: any) => {
        let column = document.getElementById(this.columnToEditId) as HTMLElement
        column.innerHTML = input.value
        this.modal.closeEditColumn()
      })
  }

  modalDelete(id: string) {
    this.modal.openDeleteColumn()
    this.class = 'hidden'
    this.columnToEditId = id
  }
  provideResultOfModal(value: boolean) {
    if (value) {
      this.deleteColumn()
    } else {
      this.modal.closeDeleteColumn()
    }
  }

  deleteColumn() {
    this.http
      .delete(`${baseUrl}boards/${this.boardId}/columns/${this.columnToEditId}`)
      .subscribe((data: any) => {
        let column = document.getElementById(
          `column-${this.columnToEditId}`
        ) as HTMLElement
        column.remove()
        this.modal.closeDeleteColumn()
      })
  }
}
