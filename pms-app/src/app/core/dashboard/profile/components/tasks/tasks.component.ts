import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop'
import { HttpClient } from '@angular/common/http'
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { ITask, ITaskItem } from 'src/app/models/interfaces'
import { ModalServiceService } from 'src/app/services/modal-service.service'
import { baseUrl } from 'src/environment/environment'

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  constructor(private http: HttpClient, public modal: ModalServiceService) {}
  @Input() task: ITaskItem = {
    columnId: '',
    description: '',
    order: 0,
    title: '',
    _id: ''
  }

  @Output() classDesc: string = 'active'
  @Output() editTaskEvent = new EventEmitter()
  @Output() deleteTaskEvent = new EventEmitter()

  ngOnInit(): void {}

  editTask(id: string) {
    this.editTaskEvent.emit(id)
  }
  modalDelete(id: string) {
    this.deleteTaskEvent.emit(id)
  }
  drop(event: CdkDragDrop<ITaskItem[]>) {
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
