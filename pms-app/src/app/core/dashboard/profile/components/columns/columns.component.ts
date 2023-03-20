import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop'
import { HttpClient } from '@angular/common/http'
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { IColumn, ITask, ITaskItem } from 'src/app/models/interfaces'
import { AuthService } from 'src/app/services/auth.service'
import { GetBoardService } from 'src/app/services/get-board.service'
import { ModalServiceService } from 'src/app/services/modal-service.service'
import { baseUrl } from 'src/environment/environment'

@Component({
  selector: 'app-columns',
  templateUrl: './columns.component.html',
  styleUrls: ['./columns.component.css']
})
export class ColumnsComponent implements OnInit {
  constructor(
    public modal: ModalServiceService,
    private http: HttpClient,
    private auth: AuthService,
    private boardService: GetBoardService
  ) {}

  @Input() column: any = {
    boardId: '',
    order: 0,
    title: '',
    _id: '',
    tasks: []
  }
  class: string = ''
  columnIds: string[] = []
  @Input() columns = []
  @Input() columnTasks: ITaskItem[] = []
  columnToEditId = ''
  columnToDeleteId = ''
  @Output() editColumnEvent = new EventEmitter()
  @Output() deleteColumnEvent = new EventEmitter()
  @Output() createTaskEvent = new EventEmitter()
  @Output() editTaskEvent = new EventEmitter()
  @Output() deleteTaskEvent = new EventEmitter()

  ngOnInit(): void {
    this.boardService.data.forEach((el: any) => {
      this.columnIds.push(`columnId-${el.columnId}`)
    })
  }

  editColumn(id: string) {
    this.editColumnEvent.emit(id)
  }
  deleteColumn(id: string) {
    this.deleteColumnEvent.emit(id)
  }

  drop(event: CdkDragDrop<ITask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      )
    } else {
      this.boardService.updateDraggedTasks(
        event.previousContainer.id,
        event.container.id,
        event.item.element.nativeElement.firstChild
      )
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      )
    }
  }

  editTaskEventEmit(id: string) {
    this.editTaskEvent.emit(id)
  }
  deleteTaskEventEmit(id: string) {
    this.deleteTaskEvent.emit(id)
  }
  createTaskEmit(id: string) {
    this.createTaskEvent.emit(id)
  }
}
