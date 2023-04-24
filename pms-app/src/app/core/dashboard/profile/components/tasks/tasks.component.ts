import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TaskItem } from 'src/app/models/interfaces';
import { ModalServiceService } from 'src/app/services/modal-service.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent {
  @Input() task: TaskItem = {
    columnId: '',
    description: '',
    order: 0,
    title: '',
    _id: ''
  };
  @Output() classDesc: string = 'active';
  @Output() editTaskEvent = new EventEmitter();
  @Output() deleteTaskEvent = new EventEmitter();

  constructor(public modal: ModalServiceService) {}

  editTask(id: string) {
    this.editTaskEvent.emit(id);
  }
  modalDelete(id: string) {
    this.deleteTaskEvent.emit(id);
  }
  drop(event: CdkDragDrop<TaskItem[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
