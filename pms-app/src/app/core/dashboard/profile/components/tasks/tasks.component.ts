import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop'
import { HttpClient } from '@angular/common/http'
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { ITask } from 'src/app/models/interfaces'
import { ModalServiceService } from 'src/app/services/modal-service.service'
import { baseUrl } from 'src/environment/environment'

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  constructor(private http: HttpClient, public modal: ModalServiceService) {}
  tasks: ITask[] = []
  @Input() columnId: any = ''
  @Output() classDesc: string = 'active'
  @Output() editTaskEvent = new EventEmitter()
  @Output() deleteTaskEvent = new EventEmitter()
  @Output() sendTasks = new EventEmitter()
  ngOnInit(): void {
    let boardId = localStorage.getItem('board_id')!
    this.http
      .get(`${baseUrl}boards/${boardId}/columns/${this.columnId}/tasks`)
      .subscribe((data: any) => {
        data.forEach((el: any) => {
          this.tasks.push(el)
        })
      })

    this.sendTasks.emit(this.tasks)
  }

  editTask(task: ITask) {
    this.editTaskEvent.emit(task)
  }
  modalDelete(task: ITask) {
    this.deleteTaskEvent.emit(task)
  }
  drop(event: CdkDragDrop<ITask[]>) {
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
