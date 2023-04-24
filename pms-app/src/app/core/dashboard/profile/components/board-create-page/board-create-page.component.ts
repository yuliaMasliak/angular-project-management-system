import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';
import { IBoardUser, IColumn } from 'src/app/models/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { GetBoardService } from 'src/app/services/get-board.service';
import { ModalServiceService } from 'src/app/services/modal-service.service';
import { baseUrl } from 'src/environment/environment';

@Component({
  selector: 'app-board-create-page',
  templateUrl: './board-create-page.component.html',
  styleUrls: ['./board-create-page.component.css']
})
export class BoardCreatePageComponent implements OnInit {
  public boardTitle: string = '';
  public class: string = '';
  public name: string = '';
  private deletedBoard = {};
  @Output() columns: any = [];
  @Output() classHidden: string = 'hidden';
  public classDesc: string = 'active';
  public columnTiEditId: string = '';
  public columnToDeleteId: string = '';
  public taskToEditId: string = '';
  public taskToDeleteId: string = '';
  public columnIdToAddTask: string = '';

  constructor(
    private router: Router,
    private http: HttpClient,
    private boardService: GetBoardService,
    private auth: AuthService,
    public modal: ModalServiceService
  ) {}

  ngOnInit(): void {
    this.boardService.getFullData();
    this.columns = this.boardService.data;
    let boardId = localStorage.getItem('board_id')!;
    this.http.get(`${baseUrl}boards/${boardId}`).subscribe((data: any) => {
      this.boardTitle = data.title;
    });
  }

  modalDelete() {
    this.modal.open();
    this.class = 'hidden';
  }
  provideResultOfModal(value: boolean) {
    if (value) {
      this.deleteBoard();
      // this.boardService.getColumns().subscribe((data: any) => {
      //   this.columns = data
      // )
    } else {
      this.modal.close();
    }
  }

  deleteBoard() {
    let boardId = localStorage.getItem('board_id')!;
    this.http.delete(`${baseUrl}boards/${boardId}`).subscribe((data: any) => {
      this.deletedBoard = data;
    });
    this.modal.close();
    this.router.navigate(['dashboard/start']);
  }
  editBoardTitle() {
    this.modal.openEditBoardTitle();
  }
  provideResultOfModalEdit(value: boolean) {
    if (value) {
      this.updateBoard();
    } else {
      this.modal.closeEditBoardTitle();
    }
  }
  updateBoard() {
    let fakeData = '';
    const input = document.getElementById('title1') as HTMLInputElement;
    let boardId = localStorage.getItem('board_id')!;

    this.boardTitle = input.value;
    const body = {
      title: input.value,
      owner: localStorage.getItem('access_id'),
      users: ['']
    };
    this.http
      .put(`${baseUrl}boards/${boardId}`, body)
      .subscribe((data: any) => {
        fakeData = data;
        this.modal.closeEditBoardTitle();
      });
  }
  back() {
    this.router.navigate(['dashboard/start']);
  }
  //// columns
  addColumnModal() {
    this.modal.openColumn();
  }
  provideResultOfModalColumn(value: boolean) {
    if (value) {
      this.createColumn();
    } else {
      this.modal.closeColumn();
    }
  }
  createColumn() {
    const input = document.getElementById('title1') as HTMLInputElement;

    const body = {
      title: input.value,
      order: 0
    };

    this.http
      .post(
        `${baseUrl}boards/${localStorage.getItem('board_id')}/columns`,
        body
      )
      .subscribe((data: any) => {
        let columnToPush = {
          columnId: data._id,
          columnTitle: data.title,
          tasks: []
        };
        this.boardService.data.push(columnToPush);
      });

    this.modal.closeColumn();
  }
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
  }
  openModalEditColumn(id: string) {
    this.columnTiEditId = id;
    this.modal.openEditColumn();
  }
  openModalDeleteColumn(id: string) {
    this.columnToDeleteId = id;
    this.modal.openDeleteColumn();
    this.class = 'hidden';
  }

  provideResultOfModalEditColumn(value: boolean) {
    if (value) {
      this.updateColumn();
    } else {
      this.modal.closeEditColumn();
    }
  }
  updateColumnTitle(data: any) {
    const body = {
      title: data.value,
      order: 0
    };
    let boardId = localStorage.getItem('board_id');

    this.http
      .put(`${baseUrl}boards/${boardId}/columns/${data.id}`, body)
      .subscribe((data: any) => {
        console.log(data);
        this.boardService.data.forEach((el: any) => {
          if (el.columnId == data._id) {
            el.columnTitle = data.title;
          }
        });
      });
  }
  updateColumn() {
    const input = document.getElementById('title1') as HTMLInputElement;

    const body = {
      title: input.value,
      order: 0
    };
    let boardId = localStorage.getItem('board_id');

    this.http
      .put(`${baseUrl}boards/${boardId}/columns/${this.columnTiEditId}`, body)
      .subscribe((data: any) => {
        this.boardService.data.forEach((el: any) => {
          if (el.columnId == this.columnTiEditId) {
            el.columnTitle = data.title;
          }
        });
      });
    this.modal.closeEditColumn();
  }

  provideResultOfModalDeleteColumn(value: boolean) {
    if (value) {
      this.deleteColumn();
    } else {
      this.modal.closeDeleteColumn();
    }
  }

  deleteColumn() {
    let boardId = localStorage.getItem('board_id');
    this.http
      .delete(`${baseUrl}boards/${boardId}/columns/${this.columnToDeleteId}`)
      .subscribe((data: any) => {
        this.boardService.data.forEach((el: any, index: any) => {
          if (el.columnId == data._id) {
            this.boardService.data.splice(index, 1);
          }
        });
        this.modal.closeDeleteColumn();
      });
  }

  //// tasks
  openModalEditTask(id: string) {
    this.taskToEditId = id;
    this.modal.openEditTask();
  }
  provideResultOfModalEditTask(value: boolean) {
    if (value) {
      this.updateTask();
      this.modal.closeEditTask();
    } else {
      this.modal.closeEditTask();
    }
  }
  updateTask() {
    const title = document.getElementById('title1') as HTMLInputElement;
    const desc = document.getElementById('description') as HTMLInputElement;

    let taskToEdit: any = {};
    this.boardService.data.forEach((el: any) => {
      el.tasks.forEach((task: any) => {
        if (task._id === this.taskToEditId) {
          taskToEdit = task;
        }
      });
    });
    const body = {
      title: title.value,
      order: 0,
      description: desc.value,
      columnId: taskToEdit.columnId,
      userId: localStorage.getItem('access_id')!,
      users: ['']
    };
    if (title.value == '') {
      body.title = taskToEdit.title;
    } else if (desc.value == '') {
      body.description = taskToEdit.description;
    }

    this.http
      .put(
        `${baseUrl}boards/${localStorage.getItem('board_id')}/columns/${
          taskToEdit.columnId
        }/tasks/${taskToEdit._id}`,
        body
      )
      .subscribe((data: any) => {
        this.boardService.data.forEach((el: any) => {
          el.tasks.forEach((task: any) => {
            if (task._id === this.taskToEditId) {
              task.title = body.title;
              task.description = body.description;
            }
          });
        });

        this.modal.closeEditColumn();
      });
  }
  openModalDeleteTask(id: string) {
    this.taskToDeleteId = id;
    this.modal.openDeleteTask();
  }

  provideResultOfModalDeleteTask(value: boolean) {
    if (value) {
      this.deleteTask();
      this.modal.closeDeleteTask();
    } else {
      this.modal.closeDeleteTask();
    }
  }
  deleteTask() {
    let taskToDelete: any = {};
    this.boardService.data.forEach((el: any) => {
      el.tasks.forEach((task: any) => {
        if (task._id === this.taskToDeleteId) {
          taskToDelete = task;
        }
      });
    });
    this.http
      .delete(
        `${baseUrl}boards/${localStorage.getItem('board_id')}/columns/${
          taskToDelete.columnId
        }/tasks/${taskToDelete._id}`
      )
      .subscribe((data: any) => {
        this.boardService.data.forEach((el: any) => {
          el.tasks.forEach((task: any, index: any) => {
            if (task._id === data._id) {
              el.tasks.splice(index, 1);
            }
          });
        });
        this.modal.closeDeleteColumn();
      });
  }
  openModalCreateTask(id: string) {
    this.columnIdToAddTask = id;
    this.modal.openCreateTask();
  }

  provideResultOfModalCreateTask(value: boolean) {
    if (value) {
      this.createTask();
    } else {
      this.modal.closeCreateTask();
    }
  }
  createTask() {
    const title = document.getElementById('title1') as HTMLInputElement;
    const desc = document.getElementById('description') as HTMLInputElement;
    const body = {
      title: title.value,
      order: 0,
      description: desc.value,
      userId: localStorage.getItem('access_id'),
      users: ['']
    };
    if (title.value == '') {
      body.title = 'Add task name';
    } else if (desc.value == '') {
      body.description = 'Add task description';
    }
    this.http
      .post(
        `${baseUrl}boards/${localStorage.getItem('board_id')}/columns/${
          this.columnIdToAddTask
        }/tasks`,
        body
      )
      .subscribe((data: any) => {
        this.boardService.data.forEach((el: any) => {
          if (el.columnId === this.columnIdToAddTask) {
            el.tasks.push(data);
          }
        });
        this.modal.closeCreateTask();
      });
  }
}
