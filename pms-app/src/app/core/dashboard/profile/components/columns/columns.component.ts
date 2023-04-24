import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task, TaskItem } from 'src/app/models/interfaces';
import { GetBoardService } from 'src/app/services/get-board.service';
import { ModalServiceService } from 'src/app/services/modal-service.service';

@Component({
  selector: 'app-columns',
  templateUrl: './columns.component.html',
  styleUrls: ['./columns.component.css']
})
export class ColumnsComponent implements OnInit {
  public class: string = '';
  public columnIds: string[] = [];
  public columnToEditId = '';
  public columnToDeleteId = '';
  public showInput = false;
  public displayTitle: boolean = true;
  @Input() column: any = {
    boardId: '',
    order: 0,
    title: '',
    _id: '',
    tasks: []
  };
  @Input() columns = [];
  @Input() columnTasks: TaskItem[] = [];
  @Output() editColumnEvent = new EventEmitter();
  @Output() deleteColumnEvent = new EventEmitter();
  @Output() createTaskEvent = new EventEmitter();
  @Output() editTaskEvent = new EventEmitter();
  @Output() deleteTaskEvent = new EventEmitter();
  @Output() editColumnTitleEvent = new EventEmitter();
  constructor(
    public modal: ModalServiceService,
    private boardService: GetBoardService
  ) {}

  ngOnInit(): void {
    this.boardService.data.forEach((el: any) => {
      this.columnIds.push(`columnId-${el.columnId}`);
    });
  }
  editColumnOnTitle(id: string) {
    this.showInput = true;
    this.columnToEditId = id;
    let title = document.getElementById(`title-${id}`) as HTMLElement;
    //title.style.display = 'none';
    this.displayTitle = false;
  }

  onClick(value: boolean) {
    if (value) {
      let newTitle = document.getElementById(
        `edit-input-${this.columnToEditId}`
      ) as HTMLInputElement;
      let data = {
        value: newTitle.value,
        id: this.columnToEditId
      };
      this.editColumnTitleEvent.emit(data);
      this.showInput = false;
      this.displayTitle = true;
    } else {
      this.showInput = false;
      this.displayTitle = true;
    }
  }
  editColumn(id: string) {
    this.editColumnEvent.emit(id);
  }
  deleteColumn(id: string) {
    this.deleteColumnEvent.emit(id);
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      this.boardService.updateDraggedTasks(
        event.previousContainer.id,
        event.container.id,
        event.item.element.nativeElement.firstChild
      );

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  editTaskEventEmit(id: string) {
    this.editTaskEvent.emit(id);
  }
  deleteTaskEventEmit(id: string) {
    this.deleteTaskEvent.emit(id);
  }
  createTaskEmit(id: string) {
    this.createTaskEvent.emit(id);
  }
}
